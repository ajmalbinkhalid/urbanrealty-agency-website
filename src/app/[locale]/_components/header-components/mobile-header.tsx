"use client";


// import AgencyLoginSVG from "@public/svg/agency-login-icon.svg";
import AtSignIcon from "@public/svg/at-sign-icon.svg";
// import CustomerLoginSVG from "@public/svg/customer-login-icon.svg";
import PhoneIcon from "@public/svg/phone-icon.svg";
import WhatsappIcon from "@public/svg/whatsapp-icon.svg";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { LanguageSelector } from "./language-selector";
import { useDisableScroll } from "@/hooks/use-disable-scroll";
import { NotificationButton } from "./notification";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";


type NavKey = "home" | "myListings" | "packageHistory" | "listyourproperty";

export const MobileHeader = () => {
  const tNav = useTranslations("navigation");
  const tHeader = useTranslations("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn,logout } = useAuth();

  useDisableScroll(isMenuOpen);

  const navItems: Array<{ key: NavKey; href: string }> = [
    { key: "home", href: "/" },
    { key: "myListings", href: "/my-listings" },
    { key: "listyourproperty", href: "/list-your-property" },

    { key: "packageHistory", href: "/package-history" },
  ];


  return (
    <>
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-3 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-3 sm:gap-3 md:gap-4">
            <LanguageSelector color=""/>
            <NotificationButton />
          </div>

        
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            {isMenuOpen ? (
              <X className="clamp-[w,1.25rem,1.5rem] clamp-[h,1.25rem,1.5rem]" />
            ) : (
              <Menu className="clamp-[w,1.25rem,1.5rem] clamp-[h,1.25rem,1.5rem]" />
            )}
          </button>
        </div>
      </div>
    
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-0 z-[-1] h-screen w-full overflow-y-auto bg-white"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: -10 }}
            key="mobile-menu"
            transition={{ duration: 0.2 }}
          >
          {isLoggedIn?  <div className="flex flex-col pt-20 pb-20">
             
              <nav className="clamp-[p,1.25rem,2.5rem] flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    className="font-semibold text-[#474777] text-[0.875rem] uppercase transition-colors hover:text-amber-500"
                    href={item.href}
                    key={item.key}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tNav(item.key)}
                  </Link>
                ))}



                <button     onClick={()=>logout()}                className="font-semibold text-start text-[#474777] text-[0.875rem] uppercase transition-colors hover:text-amber-500"
                >
                  logout
</button>
              </nav>

              {/* <div className="clamp-[px,1.25rem,2.5rem] clamp-[py,0.875rem,1.5rem] mt-4 bg-[#D9D9D9]">
                <h3 className="font-semibold text-[#474777] text-md uppercase">
                  {tHeader("login")}
                </h3>
              </div>
            

              <div className="clamp-[p,1.25rem,2.5rem] flex flex-col gap-6">
                <Link
                  className="flex items-center gap-3 rounded font-semibold text-[#474777] text-[0.875rem] uppercase transition-colors hover:text-amber-500"
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    alt="customer login icon"
                    className="size-5"
                    src={CustomerLoginSVG}
                  />
                  {tHeader("customerLogin")}
                </Link>
                <Link
                  className="flex items-center gap-3 rounded font-semibold text-[#474777] text-[0.875rem] uppercase transition-colors hover:text-amber-500"
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    alt="agency login icon"
                    className="size-5"
                    src={AgencyLoginSVG}
                  />
                  {tHeader("agencyLogin")}
                </Link>
              </div> */}

              <div className="clamp-[px,1.25rem,2.5rem] clamp-[py,0.875rem,1.5rem] mt-4 bg-[#D9D9D9]">
                <h3 className="font-semibold text-[#474777] text-md uppercase">
                  {tHeader("needHelp")}
                </h3>
              </div>

              {/* Help Section */}
              <div className="clamp-[p,1.25rem,2.5rem] flex flex-col gap-6 text-[1.25rem]">
                <p className="font-semibold text-[#474777] text-[0.875rem] uppercase">
                  GET HELP FROM OUR EXPERT 24/7
                </p>
                <Link href="tel:+961 123 4567">
                  <div className="flex items-center gap-2.5 font-normal text-[#474777]">
                    <Image alt="call icon" className="size-5" src={PhoneIcon} />
                    +961 123 4567
                  </div>
                </Link>

                <Link href="mailto:info@urbanrealty.com">
                  <div className="flex w-fit items-center gap-2.5">
                    <Image
                      alt="email icon"
                      className="size-5"
                      src={AtSignIcon}
                    />
                    <span className="font-normal text-[#FE6B35]">
                      info@urbanrealty.com
                    </span>
                  </div>
                </Link>

                <Link href="">
                  <div className="flex w-fit items-center gap-2 rounded-full bg-[#00BF56] px-4 py-2 font-semibold text-[1rem] text-white transition-colors hover:bg-green-500/70">
                    <Image
                      alt="whatsapp icon"
                      className="size-5"
                      src={WhatsappIcon}
                    />
                    <span>WhatsApp</span>
                  </div>
                </Link>
              </div>
            </div> : <div>
            
            </div>} 
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
