"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type NavKey = "home" | "myListings" | "myTeam" | "packageHistory";

export const DesktopNav = () => {
  const tNav = useTranslations("navigation");

  const navItems: Array<{ key: NavKey; href: string }> = [
    { key: "home", href: "/" },
    { key: "myListings", href: "/my-listings" },
    { key: "myTeam", href: "#" },
    { key: "packageHistory", href: "/package-history" },
  ];

  return (
    <nav
      className={
        "clamp-[gap,15px,30px] clamp-[text,0.75rem,1rem] flex items-center font-jost font-medium text-white leading-[100%] transition-all duration-500 ease-in-out"
      }
    >
      {navItems.map((item) => (
        <Link
          className="capitalize hover:underline"
          href={item.href}
          key={item.key}
        >
          {tNav(item.key)}
        </Link>
      ))}
    </nav>
  );
};
