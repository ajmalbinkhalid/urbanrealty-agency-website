"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Edit2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import CustomInput2 from "@/app/[locale]/_components/custom-components/custom-input2";
import { FormPhone } from "@/app/[locale]/_components/custom-components/custom-phone";
import CustomTextarea3 from "@/app/[locale]/_components/custom-components/custom-text-area";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { handleFormApiError } from "@/utils/error-handler";

const nameRegex = /^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*$/;
const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .regex(nameRegex, "First name can contain only Arabic or English letters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .regex(nameRegex, "Last name can contain only Arabic or English letters"),
  company: z.string().min(1, "Company name is required"),
  crNumber: z.string().min(1, "Cr Number is required"),
  companyEmail: z.email("Invalid email address").toLowerCase(),
  companyPhone: z
    .object({
      phoneCode: z
        .string()
        .regex(
          /^\+?[1-9]\d{0,3}$/,
          "Phone code must start with + and contain only digits"
        )
        .min(1, "Phone code is required")
        .transform((val) => (val.startsWith("+") ? val : `+${val}`)),
      phoneNumber: z
        .string()
        .regex(
          /^\d{8,}$/,
          "Phone number must contain only digits and be at least 8 digits"
        ),
    })
    .superRefine((data, ctx) => {
      const fullNumber = `${data.phoneCode}${data.phoneNumber}`;

      const phone = parsePhoneNumberFromString(fullNumber);

      if (!phone?.isValid()) {
        ctx.addIssue({
          code: "custom",
          path: ["phoneNumber"],
          message: "Invalid phone number for selected country",
        });
      }
    }),
  companyWhatsapp: z
    .object({
      phoneCode: z
        .string()
        .regex(
          /^\+?[1-9]\d{0,3}$/,
          "Phone code must start with + and contain only digits"
        )
        .min(1, "Phone code is required")
        .transform((val) => (val.startsWith("+") ? val : `+${val}`)),
      phoneNumber: z
        .string()
        .regex(
          /^\d{8,}$/,
          "Phone number must contain only digits and be at least 8 digits"
        ),
    })
    .superRefine((data, ctx) => {
      const fullNumber = `${data.phoneCode}${data.phoneNumber}`;

      const phone = parsePhoneNumberFromString(fullNumber);

      if (!phone?.isValid()) {
        ctx.addIssue({
          code: "custom",
          path: ["phoneNumber"],
          message: "Invalid phone number for selected country",
        });
      }
    })
    .optional(),
  companyLogo: z.instanceof(File).optional(),
  about: z
    .object({
      en: z.string(),
      ar: z.string(),
    })
    .optional(),
});

type Schema = z.infer<typeof schema>;

const ProfileForm: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.agency.companyLogo || null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.agencyTeam.firstName || "",
      lastName: user?.agencyTeam.lastName || "",
      company: user?.agency.companyName || "",
      companyEmail: user?.agency.companyEmail || "",
      crNumber: user?.agency.cRNumber || "",
      companyPhone: user?.agency.companyPhone,
      companyWhatsapp: user?.agency.companyWhatsapp,
      about: user?.agency.about || {},
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Schema) => updateProfile(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    },
    onError: (error) =>
      handleFormApiError({
        error,
        schema,
        setFieldError: (field, message) => setError(field, { message }),
      }),
  });

  const onSubmit = (data: Schema) => {
    updateProfileMutation.mutate(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("companyLogo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-4 font-semibold text-[#1800AD] text-base">
        Profile information
      </p>

      <div className="clamp-[size,8rem,10.125rem] clamp-[mb,2rem,2.625rem] relative">
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-[.375rem] object-cover",
            previewImage ? "bg-gray-200" : "bg-gray-100"
          )}
        >
          {previewImage ? (
            <Image
              alt="profile preview"
              className="rounded-1.5 object-cover"
              fill
              src={previewImage}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <span className="text-xs">Upload Image</span>
            </div>
          )}
        </div>

        <input
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          ref={fileInputRef}
          type="file"
        />

        <button
          className="absolute right-0 bottom-0 flex translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#1B1DC8] p-2.5"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Edit2Icon className="size-4 text-white" />
        </button>
      </div>

      <div className="clamp-[mb,2rem,2.25rem] flex flex-col items-start gap-6 md:items-end">
        {/* Company Name - Full Width */}
        <div className="w-full">
          <CustomInput2
            disabled={updateProfileMutation.isPending}
            errorText={errors.company?.message}
            inputProps={register("company")}
            label="Company Name"
            placeholder="Company name"
            required
            type="text"
          />
        </div>

        <div className="flex w-full flex-col gap-x-7.5 gap-y-4 md:flex-row">
          <div className="md:basis-1/2">
            <CustomInput2
              disabled={updateProfileMutation.isPending}
              errorText={errors.firstName?.message}
              inputProps={register("firstName")}
              label="First Name"
              placeholder="First Name"
              required
              type="text"
            />
          </div>

          <div className="md:basis-1/2">
            <CustomInput2
              disabled={updateProfileMutation.isPending}
              errorText={errors.lastName?.message}
              inputProps={register("lastName")}
              label="Last Name"
              placeholder="Last Name"
              required
              type="text"
            />
          </div>
        </div>
        {/* CR Number + Company Email */}
        <div className="flex w-full flex-col gap-x-7.5 gap-y-4 md:flex-row">
          <div className="md:basis-1/2">
            <CustomInput2
              disabled={updateProfileMutation.isPending}
              errorText={errors.crNumber?.message}
              inputProps={register("crNumber")}
              label="CR Number"
              placeholder="CR Number"
              required
              type="text"
            />
          </div>

          <div className="md:basis-1/2">
            <CustomInput2
              disabled={updateProfileMutation.isPending}
              errorText={errors.companyEmail?.message}
              inputProps={register("companyEmail")}
              label="Company Email"
              placeholder="Company Email"
              required
              type="text"
            />
          </div>
        </div>

        {/* Phone + Whatsapp */}
        <div className="flex w-full flex-col gap-x-7.5 gap-y-4 md:flex-row">
          <div className="md:basis-1/2">
            <FormPhone
              error={
                errors.companyPhone?.phoneCode?.message ||
                errors.companyPhone?.phoneNumber?.message
              }
              label="Company Phone"
              onChange={(val) => setValue("companyPhone", val)}
              required
              value={watch("companyPhone")}
            />
          </div>

          <div className="md:basis-1/2">
            <FormPhone
              error={
                errors.companyWhatsapp?.phoneCode?.message ||
                errors.companyWhatsapp?.phoneNumber?.message
              }
              label="Company Whatsapp"
              onChange={(val) => setValue("companyWhatsapp", val)}
              placeholder="Whatsapp Number"
              value={watch("companyWhatsapp")}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-x-7.5 gap-y-4 md:flex-row">
          <div className="md:basis-1/2">
            <CustomTextarea3
              disabled={updateProfileMutation.isPending}
              error={errors.about?.message}
              label="About (en)"
              placeholder="About (en)"
              {...register("about.en")}
            />
          </div>

          <div className="md:basis-1/2">
            <CustomTextarea3
              disabled={updateProfileMutation.isPending}
              error={errors.about?.message}
              isRTL
              label="About (ar)"
              placeholder="About (ar) "
              {...register("about.ar")}
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          className="h-11 cursor-pointer rounded-1.5 bg-[#1800AD] px-10 font-semibold text-sm text-white hover:bg-[#0f007a]/70 md:w-auto"
          disabled={updateProfileMutation.isPending}
          type="submit"
        >
          {updateProfileMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
