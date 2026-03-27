"use client";

import { Arrow } from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface Props {
  color: string;
}

export const LanguageSelector: React.FC<Props> = ({ color = "text-white" }) => {
  const currentLocale = useLocale();
  const pathName = usePathname();
  const tHeader = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex cursor-pointer items-center gap-[3px] transition-opacity text-white hover:opacity-80"
          type="button"
        >
          <h1 className={cn(color, "uppercase")}>{tHeader("language")}</h1>
          <ChevronDownIcon className={cn(color, "size-5")} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-200 w-fit border-none bg-white p-2 shadow-lg"
      >
        <Arrow className="fill-white" />
        <div className="clamp-[text,0.75rem,0.875rem] flex flex-col gap-1 font-semibold">
          <Link
            className={cn(
              "flex items-center gap-2 rounded px-4 py-2 text-sm transition-colors",
              {
                "bg-blue-50 text-[#6254B4]": currentLocale === "en",
                "text-gray-700 hover:bg-gray-100": currentLocale !== "en",
              }
            )}
            href={pathName}
            locale="en"
            onClick={() => setIsOpen(false)}
          >
            <span>EN </span>
            {currentLocale === "en" && (
              <span>
                <CheckIcon className="size-4.5" />
              </span>
            )}
          </Link>
          <Link
            className={cn(
              "flex items-center gap-2 rounded px-4 py-2 text-sm transition-colors",
              {
                "bg-blue-50 text-[#6254B4]": currentLocale === "ar",
                "text-gray-700 hover:bg-gray-100": currentLocale !== "ar",
              }
            )}
            href={pathName}
            locale="ar"
            onClick={() => setIsOpen(false)}
          >
            <span>AR </span>
            {currentLocale === "ar" && (
              <span>
                <CheckIcon className="size-4.5" />
              </span>
            )}
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};
