"use client";

import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Select({ ...props }: React.ComponentProps<typeof Root>) {
  return <Root data-slot="select " {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof Group>) {
  return <Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof Value>) {
  return <Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <Trigger
      className={cn(
        "flex h-[46px] xl:clamp-[min-w,50px,180px] 2xl:clamp-[min-w,50px,200px] min-w-[180px] items-center justify-between rounded-[6px] border border-[#6254B4] bg-white px-[15px] text-[#6254B4] text-sm",
        className
      )}
      data-size={size}
      {...props}
    >
      {children}
      <Icon>
        <ChevronDownIcon className="h-4 w-4 text-[#6254B4]" />
      </Icon>
    </Trigger>
  );
}

function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        align="start"
        className={cn(
          "z-50 rounded-[6px] border border-[#E0E0E0] bg-white shadow-md",
          "w-[var(--radix-select-trigger-width)]",
          className
        )}
        position="popper"
        sideOffset={4}
        {...props}
      >
        <Viewport className="p-1">{children}</Viewport>
      </Content>
    </Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
      data-slot="select-label"
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        "flex h-[40px] w-full cursor-pointer items-center rounded-[4px] px-3 text-[#6254B4] text-sm",
        "focus:bg-[#F4F2FF] focus:outline-none",
        className
      )}
      {...props}
    >
      <ItemText>{children}</ItemText>
    </Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof ScrollUpButton>) {
  return (
    <ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof ScrollDownButton>) {
  return (
    <ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
