"use client";
import { usePathname } from "@/i18n/navigation";
import { DesktopNav } from "../_components/header-components/desktop-nav";
import { LanguageSelector } from "../_components/header-components/language-selector";
import { LoginProfileButton } from "../_components/header-components/login-button";
import LogoSection from "../_components/header-components/logo-section";
import { MobileHeader } from "../_components/header-components/mobile-header";
import { HelpButton } from "../_components/header-components/need-help-modal";
import { NotificationButton } from "../_components/header-components/notification";

const Header = () => {
  const pathname = usePathname();
  if (pathname.includes("/login") || pathname.includes("/register")) {
    return null;
  }
  return (
    <header className="fixed top-0 z-100 w-full">
      <div className="relative w-full bg-linear-to-r from-[#006AFF] to-[#1311BF] transition-all duration-500 ease-in-out">
        <div className="clamp-[px,1.25rem,5.3125rem] flex max-w-web items-center justify-between">
          <LogoSection />
          <div className="clamp-[gap,15px,39px] hidden items-center lg:flex">
            <DesktopNav />
            <HelpButton />
            <LoginProfileButton />
            <NotificationButton />
            <div className="clamp-[gap,1rem,1.5rem] flex items-center justify-between transition-all duration-500 ease-in-out">
              <LanguageSelector color="" />
            </div>
          </div>
          <MobileHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
