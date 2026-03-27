"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { frontendApi } from "@/api/frontend-api";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { handleFormApiError } from "@/utils/error-handler";
import { FormPhone } from "../custom-components/custom-phone";

// import { FormPhone } from "../custom-components/custom-phone";

type RegisterFormProps = {
  onNext: () => void;
  onDone: () => void;
};

const nameRegex = /^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*$/;
const registerSchema = z.object({
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
  company: z.string().min(1, "Company is required"),
  cRNumber: z.string().min(1, "CR Number is required"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  phone: z
    .object({
      phoneCode: z.string().min(1, "Country code is required"),
      phoneNumber: z.string().min(1, "Mobile number is required"),
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
});

type TRegisterSchema = z.infer<typeof registerSchema>;

const RegisterForm: React.FC<RegisterFormProps> = ({ onNext, onDone }) => {
  const { registerUser, user, logout } = useAuth();

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: {
        phoneCode: "+91",
        phoneNumber: "",
      },
    },
  });

  // Update form values when user data loads
  useEffect(() => {
    if (user?.agencyTeam) {
      reset({
        firstName: user.agencyTeam.firstName || "",
        lastName: user.agencyTeam.lastName || "",
        company: user.agency.companyName || "",
        cRNumber: user.agency.cRNumber || "",
        email: user.agencyTeam.email || "",
        phone: {
          phoneCode: user.agencyTeam.phone?.phoneCode || "+91",
          phoneNumber: user.agencyTeam.phone?.phoneNumber || "",
        },
      });
    }
  }, [user, reset]);

  const phoneValue = watch("phone");

  const registerMutation = useMutation({
    mutationFn: (data: TRegisterSchema) => {
      if (user?.agencyTeam) {
        return frontendApi.resubmitApplication({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          cRNumber: data.cRNumber,
          company: data.company,
        });
      }
      return registerUser(data);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      if (user?.agencyTeam) {
        logout();
        onDone();
      } else {
        onNext();
      }
    },

    onError: (error) => {
      return handleFormApiError({
        error,
        schema: registerSchema,
        setFieldError: (field, message) => setError(field, { message }),
      });
    },
  });

  const submit = (data: TRegisterSchema) => {
    registerMutation.mutate(data);
  };

  return (
    <form
      className="relative flex w-full max-w-125 items-center py-8"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex h-fit w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 pb-8 text-center">
          <div className="font-jost font-medium text-2xl text-[#1800AD] leading-[100%]">
            {user?.agency.verificationStatus === 2
              ? "Update account"
              : "Create an account"}
          </div>
          <div className="font-jost text-[#6254B4] text-sm leading-[140%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </div>
        </div>

        <div className="flex w-full flex-col gap-5">
          <div>
            <input
              {...register("firstName")}
              className={cn(
                "w-full rounded-[.375rem] border border-[#6254B4] bg-white px-4.5 py-3.5 font-jost text-[#6254B4] text-[.875rem] leading-[100%] outline-none placeholder:text-[#6254B4]",
                {
                  "border-red-500": errors.firstName,
                }
              )}
              placeholder="First name*"
              type="text"
            />
            {errors.firstName && (
              <p className="mt-2 font-jost text-[#FF0000] text-[.75rem] leading-[100%]">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("lastName")}
              className={cn(
                "w-full rounded-[.375rem] border border-[#6254B4] bg-white px-[1.125rem] py-[.875rem] font-jost text-[#6254B4] text-[.875rem] leading-[100%] outline-none placeholder:text-[#6254B4]",
                {
                  "border-red-500": errors.lastName,
                }
              )}
              placeholder="Last name*"
              type="text"
            />
            {errors.lastName && (
              <p className="mt-[.5rem] font-jost text-[#FF0000] text-[.75rem] leading-[100%]">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("company")}
              className={cn(
                "w-full rounded-[.375rem] border border-[#6254B4] bg-white px-[1.125rem] py-[.875rem] font-jost text-[#6254B4] text-[.875rem] leading-[100%] outline-none placeholder:text-[#6254B4]",
                {
                  "border-red-500": errors.company,
                }
              )}
              placeholder="Company*"
              type="text"
            />
            {errors.company && (
              <p className="mt-[.5rem] font-jost text-[#FF0000] text-[.75rem] leading-[100%]">
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("cRNumber")}
              className={cn(
                "w-full rounded-[.375rem] border border-[#6254B4] bg-white px-[1.125rem] py-[.875rem] font-jost text-[#6254B4] text-[.875rem] leading-[100%] outline-none placeholder:text-[#6254B4]",
                {
                  "border-red-500": errors.cRNumber,
                }
              )}
              placeholder="CR Number*"
              type="text"
            />
            {errors.cRNumber && (
              <p className="mt-[.5rem] font-jost text-[#FF0000] text-[.75rem] leading-[100%]">
                {errors.cRNumber.message}
              </p>
            )}
          </div>

          <div>
            <input
              disabled={user?.agency.verificationStatus === 2}
              readOnly={user?.agency.verificationStatus === 2}
              {...register("email")}
              className={cn(
                "w-full rounded-[.375rem] border border-[#6254B4] bg-white px-[1.125rem] py-[.875rem] font-jost text-[#6254B4] text-[.875rem] leading-[100%] outline-none placeholder:text-[#6254B4]",
                {
                  "border-red-500": errors.email,
                }
              )}
              placeholder="Email*"
              type="text"
            />
            {errors.email && (
              <p className="mt-[.5rem] font-jost text-[#FF0000] text-[.75rem] leading-[100%]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <FormPhone
              // disabled={user?.agency.verificationStatus === 2}
              error={
                errors.phone?.phoneCode?.message ||
                errors.phone?.phoneNumber?.message
              }
              onChange={(val) => setValue("phone", val)}
              required
              value={phoneValue}
            />
          </div>

          <button
            className="mt-2 flex w-full items-center justify-center rounded-[.375rem] py-4 font-jost text-[1rem] text-white disabled:opacity-70"
            disabled={registerMutation.isPending}
            style={{
              background: "linear-gradient(to right, #006AFF, #1311BF)",
            }}
            type="submit"
          >
            {registerMutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>

          <div className="mt-2 flex justify-center gap-1">
            <p className="font-jost text-[#6254B4] text-[1rem] leading-[100%]">
              Already have an account?
            </p>
            <Link
              className="cursor-pointer font-jost font-medium text-[#FE6B35] text-[1rem] leading-[100%] underline"
              href={"/login"}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
