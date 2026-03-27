"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import loginImg from "@public/sign-up.png";
import Logo from "../home-page-components/realty-logo";

const AuthImageSection = () => {
  const pathname = usePathname();
  const locale = pathname.startsWith("/ar") ? "ar" : "en";

  return (
        <div className="xl-flex-row relative flex h-[60svh] clamp-[px,10px,85px] clamp-[py,24px,20px] fixed bottom-0 z-100 flex md:w-1/2 items-center justify-between border-t border-t-[#F0F0F0] bg-white lg:flex-row] md:w-1/2 shrink-0 flex-col items-center  md:h-screen justify-center overflow-hidden ">
          <Image alt="" className="object-cover " fill src={loginImg} />
          <Logo className="clamp-[w,61px,101px] clamp-[top,24px,63px] clamp-[left,24px,81px] z-100 xl:absolute" />
  
          <div className="z-100 text-center xl:pt-[20%]">
            <h1 className="clamp-[text,24px,30px] font-jost font-medium text-[#FFFFFF] leading-[100%]">
              {locale === "en"
                ? "Welcome to Urban Realty!"
                : "مرحباً بكم في شركة أوربان للعقارات!"}
            </h1>
            <p className="clamp-[text,19px,24px] mt-[16px] mb-[18px] whitespace-nowrap font-jost font-medium text-[#F0F0F0] leading-[100%]">
              {locale === "en"
                ? "Agency Portal Login"
                : "تسجيل دخول بوابة الوكالة"}
            </p>
            <p className="px-[16px] font-jost text-[#FFFFFF] text-[16px] leading-[100%]">
              {locale === "en"
                ? "Access your dashboard, manage listings, and connect with clients seamlessly."
                : "قم بالوصول إلى لوحة التحكم الخاصة بك، وإدارة القوائم، والتواصل مع العملاء بسلاسة."}
            </p>
          </div>
          <div className="absolute inset-0 z-50 h-full bg-gradient-to-b from-[#161780]/90 to-transparent" />
        </div>
  );
};

export default AuthImageSection;
