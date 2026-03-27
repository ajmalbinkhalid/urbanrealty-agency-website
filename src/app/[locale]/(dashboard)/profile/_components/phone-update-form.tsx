"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { FormPhone } from "@/app/[locale]/_components/custom-components/custom-phone";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { handleFormApiError } from "@/utils/error-handler";
import DialogOTPVerification from "./otp-dialog";

const schema = z.object({
  phone: z.object({
    phoneCode: z.string(),
    phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  }),
});

type Schema = z.infer<typeof schema>;

type PhoneUpdateFormProps = {
  currentPhone?: string;
  currentPhoneCode?: string;
};

const PhoneUpdateForm: React.FC<PhoneUpdateFormProps> = ({
  currentPhone = "",
  currentPhoneCode = "+91",
}) => {
  const { user } = useAuth();
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [tempSessionToken, setTempSessionToken] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: {
        phoneCode:
          currentPhoneCode || user?.agencyTeam?.phone.phoneCode || "+91",
        phoneNumber: currentPhone || user?.agencyTeam?.phone?.phoneNumber || "",
      },
    },
  });

  const requestPhoneOtpMutation = useMutation({
    mutationFn: (phoneData: { phoneCode: string; phoneNumber: string }) =>
      Promise.resolve({
        success: true,
        message: "OTP sent successfully",
        sessionToken: "dummy-session-token",
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
    requestPhoneOtpMutation.mutate(data.phone);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="w-full md:basis-1/2">
            <FormPhone
              disabled
              error={
                errors.phone?.phoneCode?.message ||
                errors.phone?.phoneNumber?.message
              }
              label="Phone Number"
              onChange={(val) => setValue("phone", val)}
              placeholder="Phone Number"
              value={watch("phone")}
            />
          </div>

          <Button
            className="h-11 cursor-pointer rounded-1.5 bg-[#1800AD] px-8 font-semibold text-sm text-white hover:bg-[#0f007a]/70 md:w-auto"
            disabled
            type="submit"
          >
            {requestPhoneOtpMutation.isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>

      <DialogOTPVerification
        isOpen={showOtpDialog}
        onClose={() => setShowOtpDialog(false)}
        onSuccess={() => {
          setShowOtpDialog(false);
          toast.success("Phone number updated successfully");
        }}
        sessionToken={tempSessionToken}
        type="phone"
      />
    </>
  );
};

export default PhoneUpdateForm;
