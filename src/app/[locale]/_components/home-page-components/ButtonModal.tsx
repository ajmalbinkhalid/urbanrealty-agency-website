"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PackageTypeEnum } from "@/api/enum";
import { propertiesApi } from "@/api/properties-api";
import PromotionCheckOut from "./CustomModal";
import Image from "next/image";

type Props = {
  title: string;
  trigger: React.ReactNode;
  type: (typeof PackageTypeEnum)[keyof typeof PackageTypeEnum];
};

export default function ButtonModal({ trigger, title, type }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPromotionModal, setOpenPromotionModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data: packagesData, isLoading } = useQuery({
    queryKey: ["packages", type],
    queryFn: () => propertiesApi.getAllPackages(type),
    enabled: openPromotionModal,
  });
  const packages = packagesData || [];

  const filteredPackages = packages.filter((plan) => {
    if (type === PackageTypeEnum.Promotion && plan.subscriptionType === 1) {
      return false;
    }
    return true;
  });

  const handleOpenChange = (open: boolean) => {
    setOpenPromotionModal(open);
  };

  const getPlanBackground = (plan: any) => {
    // If this plan is selected, show freeBg, otherwise show planBg
    if (selectedValue === plan._id) {
      return "/images/promo-1-bg-img.jpg"; // freeBg
    }
    return "/hero-card-bg-img.jpg"; // planBg
  };

  const getPlanTitle = (plan: any) => {
    if (plan.subscriptionType === 1) return "FREE";
    return plan.name?.toUpperCase() || "PROMO";
  };

  return (
    <div>
      <Dialog open={openPromotionModal} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className=" w-fit max-w-[1534px] p-0">
          <div className="w-full relative overflow-hidden">
            <DialogHeader className="clamp-[px,16px,30px] clamp-[py,12px,20px] border-[#E5E5E5] border-b ">
              <DialogTitle className=" font-jost font-medium leading-[100%] text-[#1800AD] text-[22px]">
                {title} packages
              </DialogTitle>
              <DialogDescription className=" font-jost text-[#2C3A61] text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </DialogDescription>
            </DialogHeader>
  
            {isLoading ? (
              <div className="flex items-center justify-center py-12 px-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B1DC8]"></div>
              </div>
            ) : (
              <div className="clamp-[p,16px,30px] scrollbar-hidden overflow-x-auto w-full">
                <RadioGroup
                    className="flex relative h-fit gap-4 max-sm:flex-col w-fit mx-auto"
                  value={selectedValue}
                  onValueChange={setSelectedValue}
                >
                  {filteredPackages.map((plan) => (
                    <div
                      className="relative w-[240px] h-fit cursor-pointer overflow-hidden shrink-0 rounded-[10px] border border-[#EAEAEA] bg-white max-sm:w-full"
                      key={plan._id}
                    >
  
                      <div className="relative h-[60px]">
                      <RadioGroupItem
                        circleClassName="fill-[#1800AD]"
                        className="absolute border-white top-1/2 -translate-y-1/2 left-3 z-20"
                        value={plan._id}
                      />
                        <Image
                          alt={getPlanTitle(plan)}
                          className="object-cover"
                          fill
                          src={getPlanBackground(plan)}
                          priority={selectedValue === plan._id}
                        />
                        <div className="relative z-10 flex h-full items-center justify-center">
                          <p className="font-jost font-medium text-[20px] text-white">
                            {getPlanTitle(plan)}
                          </p>
                        </div>
                      </div>
  
                      <div className="flex min-h-[180px] flex-col items-center justify-center bg-[#F4F5FB] text-center px-4">
                        {plan.subscriptionType === 1 ? (
                          <p className="font-jost text-[#2C3A61] text-[12px]">
                            Post your property for free! Your listing will be
                            reviewed by our admin team before going live. Buyer
                            details will be shared with you externally by our
                            team.
                          </p>
                        ) : (
                          <>
                            <div className="flex items-baseline gap-1">
                              {plan.flatPrice && (
                                <span className="font-semibold text-[#2C3A61] text-[14px] line-through">
                                  ${plan.price}
                                </span>
                              )}
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="font-semibold text-[#2C3A61] text-[16px]">
                                $
                              </span>
                              <span className="font-bold text-[#2C3A61] text-[24px]">
                                {plan.flatPrice ? plan.flatPrice : plan.price}
                              </span>
                              <span className="text-[#2C3A61] text-[11px]">
                                for {plan.validity} days
                              </span>
                            </div>
  
                            {plan.offerText && (
                              <div className="mt-2 border border-[#FF6B35] text-[#FF6B35] text-[11px] border-dashed bg-[#FE6B35]/15 px-[8px] py-[2px] w-fit rounded-[6px]">
                                {plan.offerText}
                              </div>
                            )}
  
                            <div className="my-3 w-full border-[#E5E5E5] border-b" />
  
                            {plan.noOfProperties && (
                              <p className="font-jost text-[#2C3A61] text-[12px]">
                                {plan.noOfProperties} Property Listing
                              </p>
                            )}
                            {plan.noOfFeaturedProperty && (
                              <p className="font-jost text-[#2C3A61] text-[12px] mt-1">
                                {plan.noOfFeaturedProperty} Featured properties
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
  
                  {type === PackageTypeEnum.Subscription && (
                    <div className="relative w-[240px] h-fit cursor-pointer overflow-hidden shrink-0 rounded-[10px] border border-[#EAEAEA] bg-white max-sm:w-full">
                     
  
                        <div className="relative h-[60px]">
                           <RadioGroupItem
                        circleClassName="fill-[#1800AD]"
                        className="absolute border-white top-1/2 -translate-y-1/2 left-3 z-20"
                        value="custom"
                      />
                        <Image
                          alt="Custom package"
                          className="object-cover"
                          fill
                          src={selectedValue === "custom" ? "/images/promo-1-bg-img.jpg" : "/hero-card-bg-img.jpg"}
                          priority={selectedValue === "custom"}
                        />
                        <div className="relative z-10 flex h-full items-center justify-center">
                          <p className="font-jost font-semibold text-[20px] text-white">
                            CUSTOM
                          </p>
                        </div>
                      </div>
  
                      <div className="flex min-h-[180px] flex-col items-center  bg-[#F4F5FB] text-center p-4">
                        <p className="font-jost text-[#2C3A61] text-[12px]">
                          Select your ideal package and customize it to suit your
                          preferences. Whether you're looking for extra perks,
                          special add-ons, or tailored options, we've got you
                          covered.
                        </p>
                      </div>
                    </div>
                  )}
                </RadioGroup>
              </div>
            )}
  
            <div className="flex justify-end gap-2 clamp-[pb,16px,30px] clamp-[px,16px,30px]  max-sm:justify-center">
              
              <button
      className="flex h-fit gap-[10px] rounded-[6px] bg-linear-to-r w-fit from-[#006AFF] to-[#1311BF] px-[50px] clamp-[py,6px,12.5px] text-white"
                onClick={() => {
                  setOpenDialog(true);
                  setOpenPromotionModal(false);
                }}
              >
                Proceed
              </button>
            </div>
       </div>
          </DialogContent>
      </Dialog>
      <PromotionCheckOut
        onClose={() => setOpenDialog(false)}
        open={openDialog}
        // selectedPackageId={selectedValue}
        // packageType={type}
      />
    </div>
  );
}