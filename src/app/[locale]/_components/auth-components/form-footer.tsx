"use client";

import vector from "@public/icons/arrow-up.svg";
import Image from "next/image";

const Formfooter = () => (
  <div className="clamp-[px,10px,85px] clamp-[py,24px,20px] fixed bottom-0 z-100 flex md:flex-row flex-col gap-2 w-full md:w-1/2 items-center justify-between border-t border-t-[#F0F0F0] bg-white lg:flex-row">
    <button
      className="clamp-[text,10px,16px] flex gap-3 whitespace-nowrap rounded-md bg-[#F9F9F9] px-3.25 py-1.5 text-[#1800AD]"
      type="button"
    >
      Explore Urban Realty main website
      <Image alt="" src={vector} />
    </button>

    <div className="clamp-[text,8px,14px] font-jost text-[#81818B] leading-[100%]">
      Copyright © Urban Realty 2025, All rights reserved.
    </div>
  </div>
);

export default Formfooter;
