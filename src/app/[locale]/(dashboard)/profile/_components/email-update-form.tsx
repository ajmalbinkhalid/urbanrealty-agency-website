"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import CustomInput2 from "@/app/[locale]/_components/custom-components/custom-input2";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { handleFormApiError } from "@/utils/error-handler";
import DialogOTPVerification from "./otp-dialog";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type Schema = z.infer<typeof schema>;

type EmailUpdateFormProps = {
  currentEmail?: string;
};

const EmailUpdateForm: React.FC<EmailUpdateFormProps> = ({
  currentEmail = "",
}) => {
  const { user } = useAuth();
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [tempSessionToken, setTempSessionToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: currentEmail || user?.agencyTeam.email || "",
    },
  });

  const requestEmailOtpMutation = useMutation({
    mutationFn: (email: string) =>
      Promise.resolve({
        success: true,
        message: "OTP sent to email",
        sessionToken: "temp-session-token",
      }),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      if (res.sessionToken) {
        setTempSessionToken(res.sessionToken);
        setShowOtpDialog(true);
        toast.success(res.message);
      }
    },
    onError: (error) =>
      handleFormApiError({
        error,
        schema,
        setFieldError: (field, message) => setError(field, { message }),
      }),
  });

  const onSubmit = (data: Schema) => {
    requestEmailOtpMutation.mutate(data.email);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="w-full md:basis-1/2">
            <CustomInput2
              disabled
              errorText={errors.email?.message}
              inputProps={register("email")}
              label="Email"
              placeholder="Email"
              type="email"
            />
          </div>

          <Button
            className="h-11 cursor-pointer rounded-1.5 bg-[#1800AD] px-8 font-semibold text-sm text-white hover:bg-[#0f007a]/70 md:w-auto"
            disabled
            type="submit"
          >
            {requestEmailOtpMutation.isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>

      <DialogOTPVerification
        isOpen={showOtpDialog}
        onClose={() => setShowOtpDialog(false)}
        onSuccess={() => {
          setShowOtpDialog(false);
          toast.success("Email updated successfully");
        }}
        sessionToken={tempSessionToken}
        type="email"
      />
    </>
  );
};

export default EmailUpdateForm;
