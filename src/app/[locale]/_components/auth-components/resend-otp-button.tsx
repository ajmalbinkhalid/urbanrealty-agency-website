import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { handleFormApiError } from "@/utils/error-handler";

export const ResendOtpButton: React.FC<{
  onResend: () => void;
  isLoading: boolean;
}> = ({ onResend, isLoading }) => {
  const { resendOTP } = useAuth();

  const [remainingSeconds, setRemainingSeconds] = React.useState(30);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (remainingSeconds > 0) {
      timer = setTimeout(() => {
        setRemainingSeconds(remainingSeconds - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [remainingSeconds]);

  const resendOtp = () => {
    resendMutation.mutate();
    onResend();
    setRemainingSeconds(30);
  };

  const resendMutation = useMutation({
    mutationFn: resendOTP,
    onSuccess: (res: { success: boolean; message: string }) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      setRemainingSeconds(30);
    },
    onError: (error) =>
      handleFormApiError({
        error,
      }),
  });

  return (
    // <Button
    //   className="cursor-pointer text-center text-[#FE6B35] text-[.9375rem]"
    //   disabled={isLoading || resendMutation.isPending || remainingSeconds > 0}
    //   onClick={resendOtp}
    //   type="button"
    //   variant={"link"}
    // >
    //   {resendMutation.isPending ? <Spinner /> : "Resend OTP"}
    //   {remainingSeconds > 0 && (
    //     <span className="text-gray-900">({remainingSeconds} for resend)</span>
    //   )}
    // </Button>

    <Button
      className={`cursor-pointer text-center text-[.9375rem] transition-colors ${
        remainingSeconds === 0 && !resendMutation.isPending
          ? "text-[#1800AD]"
          : "text-[#7d7e96]"
      };`}
      disabled={isLoading || resendMutation.isPending || remainingSeconds > 0}
      onClick={resendOtp}
      type="button"
      variant="link"
    >
      {resendMutation.isPending ? (
        <Spinner />
      ) : (
        <div
          className={`font-jost text-15px leading-[22px] ${remainingSeconds > 0 ? "text-gray-400" : "text-[#1800AD]"}`}
        >
          Resend OTP
          {remainingSeconds > 0 && (
            <span className="">
              {" "}
              in{" "}
              <span className="font-medium text-[#1800AD]">
                {String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:
                {String(remainingSeconds % 60).padStart(2, "0")}
              </span>
            </span>
          )}
        </div>
      )}
    </Button>
  );
};
