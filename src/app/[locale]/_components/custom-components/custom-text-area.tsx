import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CustomTextarea3Props
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  isRTL?: boolean;
}

const CustomTextarea3 = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextarea3Props
>(({ label, error, required, isRTL, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <Label className="font-semibold text-[#474777] text-[.875rem]">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
      )}

      {/* Textarea Wrapper */}
      <div
        className={cn(
          "mt-2.5 w-full overflow-hidden rounded-[.375rem] border border-[#6254B4] bg-white",
          error && "border-red-500"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <Textarea
          className={cn(
            "w-full px-3 py-2.5 font-medium text-[#6254B4] text-[.875rem] outline-none placeholder:text-gray-400",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>

      {/* Error */}
      {error && <p className="mt-1 text-[.75rem] text-red-500">* {error}</p>}
    </div>
  );
});

CustomTextarea3.displayName = "CustomTextarea3";

export default CustomTextarea3;