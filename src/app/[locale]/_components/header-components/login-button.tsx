"use client";

import edit from "@public/icons/edit-vector.svg";
import headerHomeIcon from "@public/icons/header-home-icon.svg";
import logout from "@public/icons/logout.svg";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const LoginProfileButton = () => {
  const { user, logout: logoutUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="User profile or login"
          className="clamp-[text,.75rem,.9375rem] clamp-[px,0.75rem,1rem] clamp-[py,0.2rem,0.4rem] flex cursor-pointer items-center justify-between gap-2 rounded-[.375rem] bg-white font-jost font-medium text-[#4434D8] transition-all duration-300 ease-in-out hover:bg-white/90 data-[state=open]:rounded-[5px] data-[state=open]:rounded-b-none data-[state=open]:hover:bg-white"
          type="button"
        >
          <Image
            alt="user avatar"
            className="clamp-[size,14px,16px] shrink-0"
            src={headerHomeIcon}
          />
          <span>Hi, {user?.agency.companyName ?? "Guest"} </span>

          <ChevronDownIcon className="clamp-[w,14px,18px] shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className={cn(
          "z-200 w-fit rounded-[2rem] border-none bg-white p-2 font-jost font-medium text-[#4434D8] shadow-sm duration-300 ease-in-out data-[state=open]:-mt-1 data-[state=open]:rounded-b-[.3125rem] data-[state=open]:rounded-tl-[.3125rem] data-[state=open]:rounded-tr-none",
          "PopoverContent data-[state=open]:rounded-tl-none"
        )}
      >
        <div className="clamp-[text,.75rem,.9375rem] flex flex-col gap-5 px-2 py-2">
          <Link
            className="flex cursor-pointer items-center gap-2.5"
            href="/profile"
            onClick={() => setIsOpen(false)}
          >
            <Image
              alt="edit icon"
              className="clamp-[size,14px,16px] shrink-0"
              src={edit}
            />
            <span>Edit profile</span>
          </Link>

          <button
            className="flex cursor-pointer items-center gap-2.5 text-left"
            onClick={() => {
              logoutUser();
              setIsOpen(false);
              toast.success("Logged out successfully");
            }}
            type="button"
          >
            <Image
              alt="logout icon"
              className="clamp-[size,14px,16px] shrink-0"
              src={logout}
            />
            <span>Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
