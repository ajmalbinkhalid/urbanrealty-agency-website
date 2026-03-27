import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { handleFormApiError } from "@/utils/error-handler";
import { ResendOtpButton } from "./resend-otp-button";

const schema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 digits")
    .nonempty("This field is required"),
});

type Schema = z.infer<typeof schema>;

type VerifyOtpFormProps = {
  onNext: () => void;
  onBack: () => void;
};

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({ onNext, onBack }) => {
  const { verifyOTP, tempData } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      onNext();
      return;
    },
    onError: (error) =>
      handleFormApiError({
        error,
        schema,
        setFieldError: (field, message) => {
          setError(field, { type: "manual", message });
        },
      }),
  });

  const onSubmit = (data: Schema) => {
    verifyMutation.mutate(data.otp);
    reset({ otp: "" });
  };

  return (
    <form
      className="relative flex w-full max-w-109 items-center py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-fit w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 pb-8 text-center">
          <div className="font-jost font-medium text-2xl text-[#1800AD] leading-[100%]">
            Verify with OTP
          </div>
          <div className="font-jost text-[#6254B4] text-sm leading-[140%]">
            OTP sent to{" "}
            <span className="font-semibold">{tempData?.identifier}</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-5">
          <div>
            <input
              {...register("otp")}
              className="w-full rounded-[.375rem] border border-[#6254B4] bg-white px-4.5 py-3.5 font-jost text-[#6254B4] text-[.875rem] leading-[100%] outline-none placeholder:text-[#6254B4]"
              placeholder="Enter OTP"
            />
            {errors.otp && (
              <p className="mt-2 font-jost text-[#FF0000] text-[.75rem] leading-[100%]">
                {errors.otp.message}
              </p>
            )}
          </div>

          <ResendOtpButton
            isLoading={verifyMutation.isPending}
            onResend={() => reset({ otp: "" })}
          />

          <button
            className="mt-2 flex w-full items-center justify-center rounded-[.375rem] py-4 font-jost text-[1rem] text-white"
            disabled={verifyMutation.isPending}
            style={{
              background: "linear-gradient(to right, #006AFF, #1311BF)",
            }}
            type="submit"
          >
            {verifyMutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>

          <div className="mt-2 flex justify-center">
            <button
              className="font-jost font-medium text-[#FE6B35] underline"
              onClick={onBack}
              type="button"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
