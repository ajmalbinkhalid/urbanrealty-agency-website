"use client";

import planBg from "@public/hero-card-bg-img.jpg";
import freeBg from "@public/images/promo-1-bg-img.jpg";
import Image from "next/image";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProceedButton from "./proceed-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import CancelButton from "./cancel-button";
import PromotionCheckOut from "./promotion-checkout-modal";

type Props = {
  trigger: React.ReactNode;
};

const plans = [
  {
    id: "free",
    title: "FREE",
    bg: freeBg,
    content: (
      <div className="px-[10px]">
        <p className="text-center font-jost font-semibold text-[#6254B4] text-[14px]">
          Post your property for free!
        </p>
        <p className="mt-1 text-center font-jost text-[#2C3A61] text-[13px] leading-[18px]">
          Your listing will be reviewed by our admin team before going live.
        </p>
      </div>
    ),
  },
  {
    id: "silver",
    title: "SILVER",
    price: "2700",
    duration: "30 days",
    listings: "2 Property listing",
  },
  {
    id: "gold",
    title: "GOLD",
    price: "42000",
    duration: "30 days",
    listings: "5 Property listing",
    featured: "2 Featured properties",
  },
  {
    id: "platinum",
    title: "PLATINUM",
    price: "63000",
    duration: "30 days",
    listings: "11 Property listing",
    featured: "5 Featured properties",
  },
  {
    id: "custom",
    title: "CUSTOM",
    description:
      "Select your ideal package and customize it to suit your preferences. Whether you're looking for extra perks, special add-ons, or tailored options, we've got you covered.",
  },
];

export default function SubscriptionPackages({ trigger }: Props) {
const [openDialog, setOpenDialog] = useState(false);
  const [openPromotionModal, setOpenPromotionModal] = useState(false);

  

  return (
   <div >
      <Dialog open={openPromotionModal} onOpenChange={setOpenPromotionModal }>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="w-fit p-0">
         <div>
            <DialogHeader className="border-[#E5E5E5] border-b px-6 mb-4 pb-4">
              <DialogTitle className="clamp-[text,20px,24px] font-jost font-medium text-[#1800AD] pt-6">
                Subscription packages
              </DialogTitle>
              <DialogDescription className="clamp-[text,12px,14px] mt-1  font-jost text-[#2C3A61]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </DialogDescription>
            </DialogHeader>
    
            <div className=" clamp-[px,14px,24px]">
              <RadioGroup
                className="flex gap-4 max-sm:flex-col"
                defaultValue="free"
              >
                {plans.map((plan) => (
                  <div
                    className="relative block  w-[240px] cursor-pointer overflow-hidden rounded-[10px] border border-[#EAEAEA] bg-white max-sm:w-full"
                    key={plan.id}
                  >
                    <RadioGroupItem
                circleClassName="fill-white "
                      className="absolute border-white top-3 left-3 z-20"
                 
                      value={plan.id}
                    />
    
                    <div className="clamp-[h,40px,60px] relative">
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        src={plan.bg ?? planBg}
                      />
                      <div className="relative z-10 flex h-full items-center justify-center">
                        <p className="font-jost font-semibold text-[14px] text-white">
                          {plan.title}
                        </p>
                      </div>
                    </div>
    
                    <div className="flex h-[200px] flex-col justify-center bg-[#F4F5FB] px-4 py-4 text-center max-sm:h-auto">
                      {plan.content && plan.content}
    
                      {!plan.content && plan.price && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="clamp-[text,14px,16px] font-jost font-semibold text-[#2C3A61]">
                              £
                            </span>
                            <span className="clamp-[text,20px,24px] font-jost font-semibold text-[#2C3A61] leading-none">
                              {plan.price}
                            </span>
                            <span className="font-jost font-normal text-[#2C3A61] text-[11px]">
                              for {plan.duration}
                            </span>
                          </div>
    
                          <div className="border-[#E5E5E5] border-b" />
    
                          <p className="font-jost text-[#2C3A61] text-[12px]">
                            {plan.listings}
                          </p>
    
                          {plan.featured && (
                            <>
                              <div className="border-[#E5E5E5] border-b" />
                              <p className="font-jost text-[#2C3A61] text-[12px]">
                                {plan.featured}
                              </p>
                            </>
                          )}
                        </div>
                      )}
    
                      {!(plan.content || plan.price) && (
                        <p className="px-2 font-jost text-[#2C3A61] text-[12px] leading-[16px]">
                          {plan.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
    
               <div className=" flex justify-end gap-2 pb-[2rem]  pt-[1rem] px-6 max-sm:justify-center">
                <CancelButton   onClick={() => {
       setOpenPromotionModal(false);               
                  }}   />
                <ProceedButton 
                  onClick={() => {
                    setOpenDialog(true);
                    setOpenPromotionModal(false);
                  }} 
                />
              </div>
         </div>
        </DialogContent>
      </Dialog>
       <PromotionCheckOut
              onClose={() => setOpenDialog(false)}
              open={openDialog}
            />
   </div>
  );
}