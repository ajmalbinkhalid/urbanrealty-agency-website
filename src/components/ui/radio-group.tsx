"use client";
// Custom Radio Group using Radix UI
import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof Root>) {
  return (
    <Root
      className={cn("grid gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}



type RadioGroupItemProps = React.ComponentProps<typeof Item> & {
  circleClassName?: string;
};
function RadioGroupItem({
  className,
  circleClassName,
  ...props
}: RadioGroupItemProps) {
  return (
    <Item
      className={cn(
        "clamp-[size,1rem,1.5625rem] aspect-square shrink-0 cursor-pointer rounded-full border border-[#6254B4] shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      )}
      data-slot="radio-group-item"
      {...props}
    >
      <Indicator
        className="relative flex items-center justify-center"
        data-slot="radio-group-indicator"
      >
        <CircleIcon className={cn("clamp-[size,.625rem,.9375rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-[#1800AD] text-[#1800AD] ",circleClassName)} />
      </Indicator>
    </Item>
  );
}

export { RadioGroup, RadioGroupItem };
