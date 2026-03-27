"use client";

import vector from "@public/icons/arrow-up.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

const Footer = () => {
  const tFooter = useTranslations("footer");

  const pathname = usePathname();
  if (pathname.includes("/login") || pathname.includes("/register")) {
    return null;
  }
  return (
    <div className="clamp-[gap,12px,24px] clamp-[px,16px,85px] xl:clamp-[px,0px,85px] clamp-[py,24px,20px] flex flex-col items-center justify-between border-t border-t-[#F0F0F0] lg:flex-row">
      <Link
        className="clamp-[text,14px,16px] flex items-center gap-3 whitespace-nowrap rounded-md bg-[#F9F9F9] px-3.25 py-1.5 text-[#1800AD]"
        href={"https://staging.urbanrealty-lb.com/en"}
        type="button"
      >
        {tFooter("explore")}
        <Image alt="" src={vector} />
      </Link>

      <div className="text-center font-jost text-[#81818B] text-[14px] leading-[100%]">
        {tFooter("copyright")}
      </div>
    </div>
  );
};

export default Footer;
