"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import camera from "@public/icons/camera.svg";
import dropdown from "@public/icons/dropdown-purple.svg";
import LocationIcon from "@public/icons/location.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const nameRegex = /^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*$/;

const editProfileSchema = z.object({
  companyLogo: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= 1024 * 1024,
      "Max file size is 1MB"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/png"].includes(files[0].type),
      "Only JPEG and PNG formats are allowed"
    ),
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
  companyName: z.string().min(1, "Company name is required"),
  crNumber: z.string().min(1, "CR Number is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid mobile number format"),
  location: z.string().min(1, "Location is required"),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const ProfileEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = (data: EditProfileFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="z-50 font-jost font-medium text-[#1800AD] text-[24px] leading-[100%]">
        Edit profile
      </h1>

      <div className="relative flex w-full items-center justify-center rounded-[6px] bg-white drop-shadow-2xl">
        <div className="relative w-full rounded-[6px] bg-[#F0F0F01A] px-5 py-10.5">
          <p className="font-jost font-medium text-[#1800AD] text-[20px] leading-[100%]">
            Profile information
          </p>

          <div className="pt-[16px]">
            <div className="mb-[36px]">
              <div className="relative max-w-[163px]">
                <input
                  id="companyLogo"
                  type="file"
                  {...register("companyLogo")}
                  accept="image/jpeg,image/png"
                  className="hidden"
                />

                <label
                  className="relative flex h-[110px] cursor-pointer items-center justify-center overflow-hidden rounded-[6px] border border-[#6254B4] font-jost text-[#2C3A61] text-[9px] uppercase tracking-[2px]"
                  htmlFor="companyLogo"
                >
                  ADD COMPANY LOGO
                </label>

                {typeof errors.companyLogo?.message === "string" && (
                  <p className="pt-1 text-[11px] text-red-500">
                    {errors.companyLogo.message}
                  </p>
                )}

                <Image
                  alt=""
                  className="absolute right-[-18px] bottom-[-6px]"
                  src={camera}
                />
              </div>

              <div className="pt-[12px] font-jost text-[#81818B] text-[11px] leading-[100%]">
                <p>Max file size: 1MB</p>
                <p>File format: Jpeg, Png</p>
              </div>
            </div>

            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[30px]">
                <div className="w-full">
                  <input
                    {...register("firstName")}
                    className="w-full rounded-[6px] border border-[#6254B4] px-[20px] py-[16px] font-jost text-[#6254B4] text-[9px]"
                    placeholder="First name*"
                  />
                  {typeof errors.firstName?.message === "string" && (
                    <p className="pt-1 text-[11px] text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    {...register("lastName")}
                    className="w-full rounded-[6px] border border-[#6254B4] px-[20px] py-[16px] font-jost text-[#6254B4] text-[9px]"
                    placeholder="Last name*"
                  />
                  {typeof errors.lastName?.message === "string" && (
                    <p className="pt-1 text-[11px] text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-[30px]">
                <input
                  {...register("companyName")}
                  className="w-full rounded-[6px] border border-[#6254B4] px-[20px] py-[16px] font-jost text-[#6254B4] text-[9px]"
                  placeholder="Company name*"
                />
                <input
                  {...register("crNumber")}
                  className="w-full rounded-[6px] border border-[#6254B4] px-[20px] py-[16px] font-jost text-[#6254B4] text-[9px]"
                  placeholder="CR Number*"
                />
              </div>

              <div className="flex gap-[30px]">
                <input
                  {...register("email")}
                  className="w-full rounded-[6px] border border-[#6254B4] px-[20px] py-[16px] font-jost text-[#6254B4] text-[9px]"
                  placeholder="Email*"
                  type="email"
                />
                <input
                  {...register("mobileNumber")}
                  className="w-full rounded-[6px] border border-[#6254B4] px-[20px] py-[16px] font-jost text-[#6254B4] text-[9px]"
                  placeholder="+961 | Mobile Number*"
                  type="tel"
                />
              </div>

              <div className="relative w-full">
                <Image
                  alt=""
                  className="absolute top-1/3 left-[20px]"
                  src={LocationIcon}
                />
                <input
                  {...register("location")}
                  className="w-full rounded-[6px] border border-[#6254B4] px-[42px] py-[16px] font-jost text-[#6254B4] text-[9px]"
                  placeholder="Location*"
                />
                <Image
                  alt=""
                  className="absolute top-1/2 right-[21px]"
                  src={dropdown}
                />
              </div>

              <div className="flex justify-end pt-[24px]">
                <button
                  className="rounded-[6px] bg-gradient-to-b from-[#006AFF] to-[#1311BF] px-[49px] py-[13px] font-jost text-white"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;
