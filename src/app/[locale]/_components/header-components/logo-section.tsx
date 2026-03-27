import logo from "@public/logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScrollDown } from "@/hooks/use-scroll-down";
import { cn } from "@/lib/utils";

const LogoSection = () => {
  const isScrollDown = useScrollDown();
  const tHeader = useTranslations("header");
  return (
    <div>
      <div className="flex w-fit items-center gap-5 duration-500 ease-in-out">
        <Image
          alt="Logo"
          className={cn("h-auto transition-all duration-500 ease-in-out", {
            "clamp-[w,28px,40px] clamp-[py,5px,15px]": isScrollDown,
            "clamp-[w,39px,55px] clamp-[py,8px,18px]": !isScrollDown,
          })}
          src={logo}
        />
        <h1 className="clamp-[text,12px,18px] font-medium text-[#F0F0F0] leading-[100%]">
          {tHeader("title")}
        </h1>
      </div>
    </div>
  );
};

export default LogoSection;
