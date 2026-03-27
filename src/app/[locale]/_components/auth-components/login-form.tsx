"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@/i18n/navigation";
import { handleFormApiError } from "@/utils/error-handler";
// import { FormPhone } from "../custom-components/custom-phone";

type VerificationType = "email" | "phone";

type LoginFormProps = {
  onNext: () => void;
};

const emailSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

// const phoneSchema = z.object({
//   phone: z
//     .object({
//       phoneCode: z.string().min(1, "Phone code is required"),
//       phoneNumber: z.string().min(1, "Phone number is required"),
//     })
//     .superRefine((data, ctx) => {
//       const fullNumber = `${data.phoneCode}${data.phoneNumber}`;

//       const phone = parsePhoneNumberFromString(fullNumber);

//       if (!phone?.isValid()) {
//         ctx.addIssue({
//           code: "custom",
//           path: ["phoneNumber"],
//           message: "Invalid phone number for selected country",
//         });
//       }
//     }),
// });

type TEmailSchema = z.infer<typeof emailSchema>;
// type TPhoneSchema = z.infer<typeof phoneSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ onNext }) => {
  const { login } = useAuth();
  const [loginType, setLoginType] = React.useState<VerificationType>("email");

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    reset: emailReset,
    formState: { errors: emailErrors },
    setError: setEmailFieldError,
  } = useForm<TEmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const emailMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      onNext();
    },
    onError: (error) =>
      handleFormApiError({
        error,
        schema: emailSchema,
        setFieldError: (field, message) =>
          setEmailFieldError(field, { message }),
      }),
  });

  const onEmailSubmit = (data: TEmailSchema) => {
    emailMutation.mutate({
      email: data.email,
      loginType: "email",
    });
  };

  // const {
  //   handleSubmit: phoneHandleSubmit,
  //   reset: phoneReset,
  //   formState: { errors: phoneErrors },
  //   setError: setPhoneFieldError,
  //   watch,
  //   setValue,
  // } = useForm<TPhoneSchema>({
  //   resolver: zodResolver(phoneSchema),
  // });

  // const phoneMutation = useMutation({
  //   mutationFn: login,
  //   onSuccess: (res) => {
  //     if (!res.success) {
  //       toast.error(res.message);
  //       return;
  //     }

  //     toast.success(res.message);
  //     onNext();
  //   },
  //   onError: (error) =>
  //     handleFormApiError({
  //       error,
  //       schema: phoneSchema,
  //       setFieldError: (field, message) =>
  //         setPhoneFieldError(field, { message }),
  //     }),
  // });

  // const onPhoneSubmit = (data: TPhoneSchema) => {
  //   phoneMutation.mutate({
  //     phone: data.phone,
  //     loginType: "phone",
  //   });
  // };

  // const phoneValue = watch("phone");

  return (
    <form
      className="relative flex w-full max-w-109 items-center py-8"
      onSubmit={
   emailHandleSubmit(onEmailSubmit)
          // : phoneHandleSubmit(onPhoneSubmit)
      }
    >
      <div className="flex w-full flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 pb-8 text-center">
          <div className="font-jost font-medium text-2xl text-[#1800AD] leading-[100%]">
            Login as an Agency
          </div>
          <div className="font-jost text-[#6254B4] text-sm leading-[140%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex w-full flex-col gap-5">
          <div>
            {loginType === "email" && (
              <>
                <input
                  {...emailRegister("email")}
                  className="w-full rounded-[0.375rem] border border-[#6254B4] bg-white px-4.5 py-3.5 font-jost text-[#6254B4] text-[0.875rem] leading-[100%] outline-none placeholder:text-[#6254B4]"
                  placeholder={"Email address"}
                  type="text"
                />
                {emailErrors.email && (
                  <p className="mt-2 font-jost text-[#FF0000] text-[0.75rem] leading-[100%]">
                    {emailErrors.email.message}
                  </p>
                )}{" "}
              </>
            )}
            {/* {loginType === "phone" && (
              <FormPhone
                error={phoneErrors.phone?.phoneNumber?.message}
                onChange={(val) => {
                  setValue("phone", val);
                }}
                required
                value={phoneValue}
              />
            )} */}
          </div>

         
          {/* <button
            className="text-center font-jost text-[#1800AD] text-sm underline"
            onClick={() => {
              emailReset({ email: "" });
              phoneReset({ phone: { phoneCode: "+91", phoneNumber: "" } });
              setLoginType((p) => (p === "email" ? "phone" : "email"));
            }}
            type="button"
          >
            Use {loginType === "email" ? "Mobile Number" : "Email Address"}
          </button> */}

         
          <button
            className="mt-2 flex w-full items-center justify-center rounded-[0.375rem] py-4 font-jost text-[1rem] text-white"
            disabled={emailMutation.isPending
              // || phoneMutation.isPending
            
            }
            style={{
              background: "linear-gradient(to right, #006AFF, #1311BF)",
            }}
            type="submit"
          >
            {emailMutation.isPending
              
              // || phoneMutation.isPending ?
              
           ?   (
              <Loader className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>

          {/* Footer */}
          <div className="mt-2 flex justify-center gap-1">
            <p className="font-jost text-[#6254B4] text-[1rem] leading-[100%]">
              Don&apos;t have an account?&nbsp;
            </p>
            <Link
              className="cursor-pointer font-jost font-medium text-[#FE6B35] text-[1rem] leading-[100%] underline"
              href={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
