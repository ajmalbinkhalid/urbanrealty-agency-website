"use client";

import AtSignIcon from "@public/icons/email.svg";
import WhatsappIcon from "@public/icons/whatsapp.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";

export const HelpButton = () => {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Get help"
          className="clamp-[px,0.75rem,1rem] clamp-[py,0.2rem,0.4rem] clamp-[text,0.75rem,1rem] cursor-pointer rounded-[6px] bg-[#FE6B35] font-semibold text-white transition-all duration-500"
          type="button"
        >
          {t("needHelp")}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="z-[200] w-fit border-none bg-white p-0 shadow-lg"
      >
        {/* <Arrow className="w-4 fill-white" /> */}

        <div className="flex flex-col gap-[10px] px-[24px] pt-[24px]">
          <p className="text-center font-jost text-[#2C3A61] text-[15px] leading-[100%]">
            Get help from our experts 24/7
          </p>

          <Link href="tel:+961 123 4567">
            <p className="clamp-[text,18px,22px] text-center font-jost font-normal text-[#6254B4]">
              +961 123 4567
            </p>
          </Link>
        </div>

        <div className="flex flex-col gap-[27px] px-[44px] py-[16px]">
          <Link className="mx-auto" href="mailto:info@urbanrealty.com">
            <div className="flex items-center gap-2 rounded bg-[#6254B417] px-4 py-2">
              <Image alt="email icon" className="h-5 w-5" src={AtSignIcon} />
              <span className="font-jost font-light text-[#FE6B35] text-[15px] leading-[17.5px] tracking-[-0.42px]">
                info@urbanrealty.com
              </span>
            </div>
          </Link>

          <Link className="mx-auto" href="https://wa.me/961123456">
            <button
              className="clamp-[px,20px,24px] clamp-[py,10px,12px] clamp-[text,14px,16px] flex items-center justify-center gap-2 rounded-[6px] bg-gradient-to-r from-[#006AFF] to-[#1311BF] font-jost text-white transition-all hover:opacity-90"
              type="button"
            >
              <Image
                alt="whatsapp icon"
                className="clamp-[h,16px,20px] clamp-[w,16px,20px]"
                src={WhatsappIcon}
              />
              WhatsApp
            </button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};
