"use client";

import DialogImg1 from "@public/svg/dialog-icon1";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CancelButton from "./cancel-button";
import ProceedButton from "./proceed-button";
import VisaIcon from "@public/svg/visa-icon";
import Stripe from "@public/svg/stripe-icon";
import paypal from '@public/svg/paypal.svg'
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PromotionCheckOut({ open, onClose }: Props) {
  return (
    <Dialog onOpenChange={(v) => !v && onClose()} open={open}>
      <DialogContent className="max-w-[924px] w-full">
        <DialogHeader>
          <DialogTitle className="font-jost font-medium text-[#1800AD] text-[24px] leading-[100%]">
            Payment method
          </DialogTitle>
          <DialogDescription className="font-jost text-[#2C3A61] max-w-[85ch] text-[16px] leading-[22px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <RadioGroup className="flex font-medium items-center text-[20px] text-[#1800AD]  gap-2">
             <RadioGroupItem
              circleClassName=" "
                    className="   z-20"
               
                    value={"yes"}
                  />   Credit or Debit Card
          </RadioGroup>
        </div>
        <div className="flex items-center gap-[1.4375rem]">
          <DialogImg1/>
          <VisaIcon/>
          <Stripe />
          <Image src={paypal} alt=""/>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <CancelButton />
          <ProceedButton />
        </div>
      </DialogContent>
    </Dialog>
  );
}
