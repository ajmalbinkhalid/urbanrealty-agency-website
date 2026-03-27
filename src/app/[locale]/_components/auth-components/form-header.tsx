"use client";

import { LanguageSelector } from "../header-components/language-selector";

const FormHeader = () => {
  return (
    <div className="clamp-[px,1.25rem,2rem] lg:xl-border fixed top-0 z-200 col-span-1 flex w-full justify-end gap-2 border-[#F0F0F0] bg-transparent py-6 xl:w-[50%] xl:bg-white">
      <div className="relative">
        <LanguageSelector color="text-[#FE6B35]" />
      </div>
    </div>
  );
};

export default FormHeader;
