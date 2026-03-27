"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomInput from "../../(dashboard)/list-your-property/_components/custom-input";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PromotionCheckOut({ open, onClose }: Props) {
  return (
    <Dialog onOpenChange={(v) => !v && onClose()} open={open}>
      <DialogContent className=" w-full">
        <DialogHeader>
          <DialogTitle className="font-jost font-medium text-[#1800AD] text-[24px] leading-[100%]">
            Subscription packages "Custom"
          </DialogTitle>
          <DialogDescription className="font-jost text-[#2C3A61] max-w-[85ch] text-[16px] leading-[22px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-[1rem]">
          <CustomInput
            label="No of Properties"
            type="number"
            placeholder="No of property listing"
            required
          />
          <CustomInput
            label="No of Featured Properties"
            type="number"
            placeholder="No of featured property listing"
            required
          />
          <CustomInput
            label="Validuity (in days)"
            type="number"
            placeholder="Enter validity period"
            required
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          {/* <PrimaryButton text="Submit" className="gap-2" /> */}
<button            className="rounded-md bg-[#1800AD] px-4 py-2 text-white"
            onClick={onClose}
          >
            Submit
          </button>        </div>
      </DialogContent>
    </Dialog>
  );
}
