"use client";

import ellipse from "@public/images/Ellipse-red.svg";
import notification from "@public/images/notification.svg";
import personIcon from "@public/images/person-icon.svg";
import scheduleIcon from "@public/images/schedule-icon.svg";
import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/use-auth";

export const NotificationButton = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Notifications"
          className="relative flex items-center transition-opacity hover:opacity-80"
          type="button"
        >
          <Image
            alt="notification bell"
            className="clamp-[h,15px,31px]"
            src={notification}
          />
          <Image
            alt="notification indicator"
            className="clamp-[h,2px,4px] clamp-[w,2px,4px] absolute top-0 -right-1"
            src={ellipse}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="z-[200] w-75 p-0">
        {/* <div className="top-0 right"><Arrow className="fill-white w-4 " /></div> */}
        <div className="px-5 py-3">
          <h2 className="font-semibold text-[#1800AD] text-[16px] leading-[100%]">
            Notifications
          </h2>
          <div className="flex flex-col">
            <div className="flex gap-2.5 pt-3.25">
              <div className="shrink-0">
                <div className="flex items-center justify-center">
                  <Image alt="notification icon" src={personIcon} />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-black leading-3.75">
                  Your custom package has been approved by admin, to complete
                </p>
                <button
                  className="mt-1.5 rounded-sm bg-[#FE6B35] px-2 py-1 text-[11px] text-white transition-colors hover:bg-[#FE6B35]/90"
                  type="button"
                >
                  Pay now
                </button>
                <p className="pt-1 text-[#6254B4] text-[11px] leading-[100%]">
                  10 minutes ago
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-3.25">
              <div className="shrink-0">
                <Image alt="notification icon" src={scheduleIcon} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-black leading-3.75">
                  You have new appointment request received from Mohammed Ali.
                </p>
                <p className="mt-1 text-[11px] text-violet-500">Yesterday</p>
              </div>
            </div>

            <div className="flex gap-3 pt-3.25">
              <div className="shrink-0">
                <Image alt="notification icon" src={personIcon} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-black leading-3.75">
                  You have new appointment request received from Mohammed Ali.
                </p>
                <p className="mt-1 text-[11px] text-violet-500">Yesterday</p>
              </div>
            </div>

            <div className="flex gap-3 pt-3.25">
              <div className="shrink-0">
                <Image alt="notification icon" src={scheduleIcon} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-black leading-3.75">
                  You have new appointment request received from Mohammed Ali.
                </p>
                <p className="mt-1 text-[11px] text-violet-500">8 hours ago</p>
              </div>
            </div>

            <div className="flex gap-3 pt-3.25">
              <div className="shrink-0">
                <Image alt="notification icon" src={personIcon} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-black leading-3.75">
                  You have new visit schedule received from Allan Mclaren.
                </p>
                <p className="mt-1 text-[11px] text-violet-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
