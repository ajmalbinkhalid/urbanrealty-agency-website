"use client";

import { useMutation } from "@tanstack/react-query";
import { OTPInput, type SlotProps } from "input-otp";
import { CheckIcon, MailIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type DialogOTPVerificationProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  sessionToken: string;
  type: "email" | "phone";
};

const DialogOTPVerification = ({
  isOpen,
  onClose,
  onSuccess,
  sessionToken,
  type,
}: DialogOTPVerificationProps) => {
  // const { verifyProfileOtp, resendProfileOtp } = useAuth();
  const [value, setValue] = useState("");
  const [hasGuessed, setHasGuessed] = useState<undefined | boolean>(undefined);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasGuessed) {
      closeButtonRef.current?.focus();
    }
  }, [hasGuessed]);

  const verifyMutation = useMutation({
    mutationFn: (otp: string) =>
      Promise.resolve({
        success: true,
        message: "OTP verified successfully",
      }),
    onSuccess: (res) => {
      if (!res.success) {
        setHasGuessed(false);
        toast.error(res.message);
        return;
      }
      setHasGuessed(true);
      toast.success(res.message);
    },
    onError: () => {
      setHasGuessed(false);
      toast.error("Failed to verify OTP");
    },
  });

  const resendMutation = useMutation({
    mutationFn: () =>
      Promise.resolve({
        success: true,
        message: "OTP resent successfully",
      }),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    onError: () => {
      toast.error("Failed to resend OTP");
    },
  });

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault?.();

    inputRef.current?.select();
    await new Promise((r) => setTimeout(r, 100));

    if (value.length === 6) {
      verifyMutation.mutate(value);
    } else {
      setHasGuessed(false);
    }

    setValue("");
    setTimeout(() => {
      inputRef.current?.blur();
    }, 20);
  }

  const handleClose = () => {
    if (hasGuessed) {
      onSuccess();
      setTimeout(() => {
        setValue("");
        setHasGuessed(undefined);
        onClose();
      }, 300);
    }
  };

  const handleDialogChange = (open: boolean) => {
    if (!(open || verifyMutation.isPending || resendMutation.isPending)) {
      setValue("");
      setHasGuessed(undefined);
      onClose();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogChange} open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center gap-2">
          <div
            aria-hidden="true"
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-600/10 dark:bg-sky-400",
              { "bg-green-600/10 dark:bg-green-400/10": hasGuessed }
            )}
          >
            {hasGuessed ? (
              <CheckIcon
                className="text-green-600 dark:text-green-400"
                strokeWidth={1}
              />
            ) : (
              <MailIcon
                className="text-sky-600 dark:text-sky-400"
                strokeWidth={1}
              />
            )}
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {hasGuessed
                ? `${type === "email" ? "Email" : "Phone"} verified!`
                : `Check Your ${type === "email" ? "Email" : "Phone"}`}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {hasGuessed ? (
                <span>
                  Congratulations! your {type} has been verified and updated
                  successfully.
                </span>
              ) : (
                <span>
                  We have sent a verification code to your {type}. Please check
                  and input the code below to verify and update.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {hasGuessed ? (
          <div className="text-center">
            <DialogClose asChild>
              <Button onClick={handleClose} ref={closeButtonRef} type="button">
                Continue
              </Button>
            </DialogClose>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <OTPInput
                containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                disabled={verifyMutation.isPending}
                id="confirmation-code"
                maxLength={6}
                onChange={setValue}
                onComplete={onSubmit}
                onFocus={() => setHasGuessed(undefined)}
                ref={inputRef}
                render={({ slots }) => (
                  <div className="flex gap-2">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
                value={value}
              />
            </div>
            {hasGuessed === false && (
              <p
                aria-live="polite"
                className="text-center text-muted-foreground text-xs"
                role="alert"
              >
                Invalid code. Please try again.
              </p>
            )}
            <p className="text-center text-sm">
              Didn&apos;t get a code?{" "}
              <button
                className="text-sky-600 hover:underline disabled:opacity-50 dark:text-sky-400"
                disabled={resendTimer > 0 || resendMutation.isPending}
                onClick={() => resendMutation.mutate()}
                type="button"
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
              </button>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-md border border-input bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow]",
        { "z-10 border-ring ring-[3px] ring-ring/50": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

export default DialogOTPVerification;
