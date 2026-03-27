"use client";

import cardBgImg from "@public/hero-card-bg-img.jpg";
import heroImage from "@public/hero-image.png";
import add from "@public/icons/add-icon.svg";
import heroAverageLogo from "@public/icons/hero-piechart.svg";
import icon2 from "@public/icons/purchase-icon.svg";
import icon from "@public/icons/subscription-icon.svg";
import overlay from "@public/overlay.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PackageTypeEnum } from "@/api/enum";
import { useAuth } from "@/hooks/use-auth";
import { VerificationStatusEnum } from "@/utils/enum";
import CommonButton from "../custom-components/common-button";
import ButtonModal from "./ButtonModal";
export default function Home() {
  const t = useTranslations("HomePage");
  const { user } = useAuth();
 
  return (
    <>
      <div className="clamp-[pb,12px,27px] relative z-50 flex flex-col gap-3 max-md:items-end sm:flex-row sm:items-center sm:justify-between">
        <h1 className="pt-[1rem] font-medium text-[#1800AD] text-[24px] leading-[100%] max-md:hidden">
          {t("title")}
        </h1>
        {user?.agency.verificationStatus ===
          VerificationStatusEnum.Published && (
          <CommonButton image={add} title="List your property" />
        )}
      </div>

      <div className="clamp-[px,14px,36px] clamp-[py,14px,36px] rounded-[6px] border bg-white drop-shadow-lg">
        <div className="relative flex flex-col overflow-hidden bg-[#FE6B3517] lg:flex-row">
          <div className="w-full px-4 pt-[1.875rem] pb-[1.5rem] lg:w-[55%] lg:pl-[3.125rem]">
            <div className="mb-[24px] flex flex-col gap-[10px]">
              <h1 className="clamp-[text,17px,20px] font-jost font-medium text-[#1800AD] leading-[100%]">
                {t("welcomeback")}, {user?.agency.companyName}
              </h1>
              <h1 className="clamp-[text,13px,16px] font-jost text-[#81818B] leading-[100%]">
                {t("propertyportfolio")}
              </h1>
            </div>

            <div className="clamp-[gap,6px,70px] flex flex-col md:flex-row md:items-center">
              <div className="clamp-[gap,32px,70px] flex h-auto items-center self-stretch">
                <div className="flex flex-col items-center gap-[0.75rem]">
                  <Image
                    alt="group"
                    className="h-[120px] w-[120px]"
                    src={heroAverageLogo}
                  />
                </div>

                <div className="flex flex-col items-start items-center justify-center max-md:items-start">
                  <h1 className="clamp-[text,14px,16px] mb-[0.5rem] text-nowrap font-jost font-medium text-[#2C3A61] leading-[22px]">
                    {t("totalactiveprop")}
                  </h1>
                  <h1 className="clamp-[text,50px,70px] font-jost font-medium text-[#2C3A61] leading-[100%]">
                    {user
                      ? (user?.agency.activeSalePropertiesCount || 0) +
                        (user?.agency.activeRentPropertiesCount || 0)
                      : "_"}
                  </h1>
                </div>

                <div className="hidden h-auto w-[1px] self-center self-stretch bg-[#000000] md:block" />
              </div>

              <div className="flex flex-row justify-start gap-[1.125rem] md:flex-col">
                <div className="clamp-[gap,0.5rem,1.75rem] flex items-start">
                  <div className="h-auto w-[8px] self-stretch bg-[#FE6B35]" />
                  <div>
                    <h1 className="clamp-[text,12px,16px] mb-[0.25rem] text-nowrap font-jost text-[#2C3A61] leading-[22px]">
                      {t("propforsell")}
                    </h1>
                    <h1 className="clamp-[text,32px,42px] font-jost font-medium text-[#2C3A61] leading-[100%]">
                      {user?.agency.activeSalePropertiesCount || "0"}
                    </h1>
                  </div>
                </div>

                <div className="clamp-[gap,0.5rem,1.75rem] flex items-start">
                  <div className="h-auto w-[8px] self-stretch bg-[#6254B4]" />
                  <div>
                    <h1 className="clamp-[text,12px,16px] mb-[0.25rem] text-nowrap font-jost text-[#2C3A61] leading-[22px]">
                      {t("propforrent")}
                    </h1>
                    <h1 className="clamp-[text,32px,42px] font-jost font-medium text-[#2C3A61] leading-[100%]">
                      {user?.agency.activeRentPropertiesCount || "0"}
                    </h1>
                  </div>
                </div>
              </div>
              <h1 className="mt-3 whitespace-nowrap font-jost text-[#81818B] text-[14px] leading-[100%] md:hidden">
                {t("lastupdated")}
              </h1>
            </div>
            <h1 className="clamp-[gap,6px,70px] whitespace-nowrap font-jost text-[#81818B] text-[14px] leading-[100%] max-md:hidden">
              {t("lastupdated")}
            </h1>
          </div>

          <div className="relative mb-[-4rem] w-[45%] items-center max-lg:hidden lg:flex lg:justify-end 2xl:justify-center">
            <Image
              alt=""
              className="absolute inset-0 bottom-0 h-full"
              src={overlay}
            />
            <div className="clamp-[h,180px,300px] clamp-[w,210px,450px] relative z-40 flex items-center justify-center">
              <Image
                alt=""
                className="object-cover object-top"
                fill
                src={heroImage}
              />
            </div>
          </div>
        </div>
        {user?.agency.verificationStatus ===
          VerificationStatusEnum.Verification_Pending && (
          <div className="clamp-[mt,16px,42px] clamp-[gap,12px,24px] clamp-[py,16px,53px] flex flex-col items-center rounded-[4px] border border-[#F0F0F0] px-[1rem] shadow-2xs">
            <svg
              className="clamp-[size,30px,67px]"
              fill="none"
              viewBox="0 0 67 67"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M67 33.5C67 52.0015 52.0015 67 33.5 67C14.9985 67 0 52.0015 0 33.5C0 14.9985 14.9985 0 33.5 0C52.0015 0 67 14.9985 67 33.5ZM33.5 16.75V33.5H16.75V39.0833H39.0833V16.75H33.5Z"
                fill="#1800AD"
                fill-rule="evenodd"
              />
            </svg>
            <div className="clamp-[text,12px,15px] clamp-[px,10px,20px] clamp-[py,8px,10px] rounded-[6px] border-[#6254B4] border-[1.5px] border-dashed bg-[#F0F0F0] text-center font-medium text-[#6254B4]">
              We're carefully evaluating your application to ensure you meet our
              criteria for becoming a valued vendor on our platform Approval
              Pending
            </div>
          </div>
        )}
        {user?.agency.verificationStatus ===
          VerificationStatusEnum.Published && (
          <div className="clamp-[mt,16px,42px] clamp-[gap,16px,38px] grid grid-cols-1 lg:grid-cols-2">
            <div>
              <div className="clamp-[py,8px,20px] clamp-[px,10px,24px] relative flex flex-col gap-[16px] overflow-hidden rounded-t md:flex-row md:items-end">
                <Image
                  alt=""
                  className="absolute inset-0 object-cover"
                  src={cardBgImg}
                />
                <div className="relative z-50">
                  <h1 className="clamp-[text,17px,24px] font-jost text-[#FFFFFF] leading-[100%]">
                    {t("subpackages")}
                  </h1>
                  <div className="clamp-[pt,4px,10px] clamp-[gap,6px,16px] flex flex-wrap items-center text-nowrap">
                    <h1 className="clamp-[text,12px,16px] font-jost text-white">
                      {t("currentsubplan")}
                    </h1>
                    <h1 className="clamp-[text,12px,20px] font-bold text-white leading-[100%]">
                      {t("silver")}
                    </h1>
                  </div>
                </div>
                <div className="relative z-50 flex flex-1 items-end justify-between">
                  {/* // sub */}
                  <ButtonModal
                    title="Subscription"
                    trigger={
                      <button
                        className="clamp-[px,10px,13px] h-fit rounded-[6px] bg-[#FE6B35] py-[6px] text-center font-jost text-[14px] text-white"
                        type="button"
                      >
                        {t("upgrade")}
                      </button>
                    }
                    type={PackageTypeEnum.Subscription}
                  />

                  <div className="clamp-[size,34px,81px] z-50 shrink-0">
                    <Image alt="" src={icon} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 rounded-b-[6px] bg-white py-[24px] drop-shadow sm:grid-cols-4">
                <div className="flex flex-col gap-[6px] border-[#F0F0F0] border-r px-[24px]">
                  <p className="clamp-[text,11px,14px] font-jost text-[#2C3A61] leading-[22px]">
                    {t("proplisted")}
                  </p>
                  <p className="font-jost font-medium text-[#2C3A61] text-[16px] leading-[100%]">
                    2/5
                  </p>
                </div>

                <div className="flex flex-col gap-[6px] border-[#F0F0F0] px-[24px] sm:border-r">
                  <p className="clamp-[text,11px,14px] font-jost text-[#2C3A61] leading-[100%]">
                    {t("expirydate")}
                  </p>
                  <p className="clamp-[text,14px,16px] font-jost font-medium text-[#FE6B35] leading-[100%]">
                    {t("in 6 more days")}
                  </p>
                  <button
                    className="w-fit font-jost text-[#1800AD] text-[14px] underline"
                    type="button"
                  >
                    {t("renew")}
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-[6px] border-[#F0F0F0] border-r px-[24px] sm:mt-0">
                  <p className="clamp-[text,11px,14px] font-jost text-[#2C3A61] leading-[22px]">
                    {t("lastrenew")}
                  </p>
                  <p className="clamp-[text,14px,16px] font-jost font-medium text-[#2C3A61] leading-[100%]">
                    15 Jan 2025
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-[6px] px-[24px] sm:mt-0">
                  <p className="clamp-[text,11px,14px] font-jost text-[#2C3A61]">
                    Featured properties
                  </p>
                  <p className="font-jost font-medium text-[#2C3A61] text-[16px]">
                    1/4
                  </p>
                </div>
              </div>
            </div>

            <div className="h-full">
              {" "}
              {/* Added h-full to the grid item */}
              <div className="flex h-full flex-col">
                {" "}
                {/* Added flex column and h-full */}
                <div className="clamp-[py,8px,20px] clamp-[px,10px,24px] relative flex flex-col gap-[16px] overflow-hidden rounded-t md:flex-row md:items-end">
                  <Image
                    alt=""
                    className="absolute inset-0 object-cover"
                    src={cardBgImg}
                  />
                  <div className="relative z-50">
                    <h1 className="clamp-[text,17px,24px] text-nowrap font-jost text-[#FFFFFF] leading-[100%]">
                      {t("promotionpackages")}
                    </h1>
                    <div className="clamp-[pt,4px,10px] clamp-[gap,6px,16px] flex flex-wrap items-center text-nowrap">
                      <h1 className="clamp-[text,12px,16px] font-jost text-white">
                        {t("currentlyyouhavenopackages")}
                      </h1>
                    </div>
                  </div>{" "}
                  <div className="relative z-50 flex flex-1 items-end justify-between">
                    <ButtonModal
                      title="Promotion"
                      trigger={
                        <button
                          className="clamp-[px,10px,13px] rounded-[6px] bg-[#FE6B35] py-[6px] text-center font-jost text-[14px] text-white"
                          type="button"
                        >
                          {t("purchasenow")}
                        </button>
                      }
                      type={PackageTypeEnum.Promotion}
                    />
                    <div className="clamp-[size,34px,81px] z-50 shrink-0">
                      <Image alt="" src={icon2} />
                    </div>
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-2 rounded-b-[6px] bg-white py-[24px] drop-shadow sm:grid-cols-3">
                  {" "}
                  <div className="flex flex-col gap-[6px] border-[#F0F0F0] border-r px-[24px]">
                    <p className="clamp-[text,11px,14px] text-center font-jost text-[#2C3A61] leading-[22px]">
                      {t("numberofpromotions")}
                    </p>
                    <p className="text-center font-jost font-medium text-[#2C3A61] text-[16px] leading-[100%]">
                      -
                    </p>
                  </div>
                  <div className="flex flex-col gap-[6px] border-[#F0F0F0] px-[24px] sm:border-r">
                    <p className="clamp-[text,11px,14px] text-center font-jost text-[#2C3A61] leading-[100%]">
                      {t("expirydate")}
                    </p>
                    <p className="clamp-[text,14px,16px] text-center font-jost font-medium text-[#2C3A61] leading-[100%]">
                      -
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-[6px] px-[24px] sm:mt-0">
                    <p className="clamp-[text,11px,14px] text-center font-jost text-[#2C3A61] leading-[22px]">
                      {t("lastrenew")}
                    </p>
                    <p className="clamp-[text,14px,16px] text-center font-jost font-medium text-[#2C3A61] leading-[100%]">
                      -
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {user?.agency.verificationStatus ===
          VerificationStatusEnum.Rejected && (
          <div className="clamp-[mt,16px,42px] clamp-[gap,14px,19px] clamp-[py,16px,27px] flex flex-col items-center rounded-[4px] border border-[#F0F0F0] px-[1rem] shadow-2xs">
            <svg
              className="clamp-[size,30px,64px]"
              fill="none"
              viewBox="0 0 63 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M43.9525 63.9999H0.624999C0.28 63.9999 0 63.7199 0 63.3749V0.624999C0 0.28 0.28 0 0.624999 0H32.6525C33.1912 0 33.3775 0.536249 33.2112 0.906249L43.6712 11.3662C43.94 11.2462 44.2962 11.3112 44.4712 11.5612C44.5362 11.6562 44.5775 11.7775 44.5775 11.925V31.1525C44.5775 31.4362 44.3887 31.675 44.1312 31.7512V62.7112C44.7787 62.8849 44.7187 63.9999 43.9525 63.9999Z"
                fill="#FE6B35"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M44.5773 12.55H32.6523C32.3073 12.55 32.0273 12.27 32.0273 11.925V0H32.6423C32.8011 0 32.9636 0.0525 33.0948 0.18375L44.3936 11.4825C44.5148 11.6037 44.5761 11.7525 44.5761 11.8987L44.5773 12.55Z"
                fill="#81818B"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M37.5864 20.2559H14.7702C13.9464 20.2559 13.9464 19.0059 14.7702 19.0059H37.5864C38.4089 19.0059 38.4089 20.2559 37.5864 20.2559Z"
                fill="#F0F0F0"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M37.5864 32.2686H14.7702C13.9477 32.2686 13.9477 31.0186 14.7702 31.0186H37.5864C38.4089 31.0186 38.4089 32.2686 37.5864 32.2686Z"
                fill="#F0F0F0"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M29.6101 44.2812H14.7702C13.9464 44.2812 13.9464 43.0312 14.7702 43.0312H29.6101C30.4326 43.0312 30.4326 44.2812 29.6101 44.2812Z"
                fill="#F0F0F0"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M31.5876 56.293H14.7702C13.9464 56.293 13.9464 55.043 14.7702 55.043H31.5876C32.4114 55.043 32.4114 56.293 31.5876 56.293Z"
                fill="#F0F0F0"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M11.8413 23.4812H5.39258C5.04633 23.4812 4.76758 23.2012 4.76758 22.8562V16.4075C4.76758 16.0612 5.04633 15.7812 5.39258 15.7812H11.8413C12.1863 15.7812 12.4663 16.0612 12.4663 16.4075V22.8562C12.4663 23.2012 12.1863 23.4812 11.8413 23.4812Z"
                fill="white"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M9.28136 20.9232C9.12136 20.9232 8.96136 20.862 8.84011 20.7407L6.95636 18.857C6.37386 18.2757 7.25761 17.392 7.84011 17.9732L9.28136 19.4145L12.6064 16.0895C13.1889 15.5082 14.0726 16.392 13.4901 16.9732L9.72386 20.7407C9.60136 20.862 9.44136 20.9232 9.28136 20.9232Z"
                fill="#6254B4"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M11.8413 35.4939H5.39258C5.04633 35.4939 4.76758 35.2139 4.76758 34.8689V28.4189C4.76758 28.0739 5.04633 27.7939 5.39258 27.7939H11.8413C12.1863 27.7939 12.4663 28.0739 12.4663 28.4189V34.8689C12.4663 35.2139 12.1863 35.4939 11.8413 35.4939Z"
                fill="white"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M11.8413 47.5044H5.39258C5.04633 47.5044 4.76758 47.2257 4.76758 46.8794V40.4307C4.76758 40.0857 5.04633 39.8057 5.39258 39.8057H11.8413C12.1863 39.8057 12.4663 40.0857 12.4663 40.4307V46.8794C12.4663 47.2257 12.1863 47.5044 11.8413 47.5044Z"
                fill="white"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M9.28121 44.9489C9.11621 44.9489 8.95621 44.8826 8.83996 44.7651L6.95621 42.8814C6.37371 42.3001 7.25871 41.4164 7.83996 41.9976L9.28121 43.4389L12.6062 40.1139C13.1875 39.5326 14.0725 40.4164 13.49 40.9989L9.72371 44.7651C9.60621 44.8826 9.44746 44.9489 9.28121 44.9489Z"
                fill="#6254B4"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M11.8413 59.5174H5.39258C5.04633 59.5174 4.76758 59.2374 4.76758 58.8924V52.4424C4.76758 52.0974 5.04633 51.8174 5.39258 51.8174H11.8413C12.1863 51.8174 12.4663 52.0974 12.4663 52.4424V58.8924C12.4663 59.2374 12.1863 59.5174 11.8413 59.5174Z"
                fill="white"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M45.3534 63.9995C36.1072 63.9995 28.5859 56.4783 28.5859 47.2333C28.5859 37.9871 36.1072 30.4658 45.3534 30.4658C54.5984 30.4658 62.1197 37.9871 62.1197 47.2333C62.1197 56.4783 54.5984 63.9995 45.3534 63.9995Z"
                fill="url(#paint0_linear_3413_1795)"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M52.0934 57.2165C51.2247 57.2165 50.4097 56.8803 49.7997 56.269L45.3522 51.8228L40.9059 56.269C38.8847 58.2915 35.3697 56.8803 35.3697 53.9753C35.3697 53.1065 35.7059 52.2915 36.3159 51.6803L40.7634 47.234L36.3172 42.7865C34.2947 40.764 35.7059 37.2503 38.6109 37.2503C39.4809 37.2503 40.2959 37.5865 40.9059 38.1978L45.3522 42.644L49.7997 38.1978C51.8222 36.174 55.3359 37.5878 55.3359 40.4928C55.3359 41.3615 54.9997 42.1765 54.3884 42.7878L49.9422 47.234L54.3884 51.6803C56.4109 53.7028 54.9996 57.2165 52.0934 57.2165Z"
                fill="#EFF3F9"
                fill-rule="evenodd"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_3413_1795"
                  x1="28.5859"
                  x2="62.535"
                  y1="30.4658"
                  y2="30.604"
                >
                  <stop stop-color="#006AFF" />
                  <stop offset="1" stop-color="#1311BF" />
                </linearGradient>
              </defs>
            </svg>

            <div className="clamp-[text,12px,15px] clamp-[px,10px,20px] clamp-[py,8px,10px] rounded-[6px] border-[#FE6B35] border-[1.5px] border-dashed bg-[#FFF0EB] text-center font-medium text-[#FE6B35] leading-[110%]">
              {user.agency.verificationRejectMessage} - Your application has
              been rejected. Please resubmit the details.
            </div>
            <Link
              className="clamp-[text,0.875rem,1rem] flex w-fit items-center justify-center rounded-[0.375rem] px-[22px] py-[8px] font-jost text-white"
              href={"/register"}
              style={{
                background: "linear-gradient(to right, #006AFF, #1311BF)",
              }}
            >
              Resubmit details
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
