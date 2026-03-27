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
      {label && (
        <Label
          className=" text-[#474777] text-[.875rem]"
          htmlFor={props.id}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
      )}
      <Textarea
        className={cn(
          "mt-2.5 h-auto w-full rounded-[.375rem] border border-[#6254B4] bg-white px-3.75 py-2.5 font-medium text-[.875rem] placeholder-gray-400 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        dir={isRTL ? "rtl" : "ltr"}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-[.75rem] text-red-500">* {error}</p>}
    </div>
  );
});

CustomTextarea3.displayName = "CustomTextarea3";

export default CustomTextarea3;
