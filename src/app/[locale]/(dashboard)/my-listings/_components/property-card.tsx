"use client";
import binIcon from "@public/icons/card-delete.svg";
import eyeIcon from "@public/icons/eye.svg";
import mapPinIcon from "@public/icons/location.svg";
import pencilIcon from "@public/icons/pen.svg";
import { Tooltip } from "@radix-ui/react-tooltip";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PropertyCategoryEnum, VerificationStatusEnum } from "@/utils/enum";
import { EnumHelper } from "@/utils/enum-helper";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  id: string;
  image: string;
  type: number;
  propertyId:string
  title: string;
  price: string;
  subCategoryName: string;
  location: string;
  category: number;
  postedOn: string;
  verificationStatus: number;
  status: number;
  isFeatured: boolean;
  isLoading?: boolean;
  onToggleStatus?: (id: string) => void;
  onToggleFeatured?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const PropertyCard = ({
  id,
  image,
  type,
  title,
  propertyId,
  price,
  subCategoryName,
  location,
  category,
  postedOn,
  verificationStatus,
  status,
  isFeatured,
  onToggleStatus,
  onToggleFeatured,
  onDelete,
  isLoading,
}: Props) => {


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="relative rounded-md bg-white shadow-[0px_10px_20px_0px_rgba(59,77,129,0.08)]">
      <Image
        alt="properties"
        className="aspect-392/241 w-full rounded-t-md"
        height={0}
        src={image}
        width={0}
      />
     {verificationStatus=== 1 && <div className="absolute end-4.5 top-4.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="h-auto cursor-pointer rounded-full bg-white/70 p-1.5! hover:bg-white"
                disabled={isLoading}
                onClick={() => onToggleFeatured?.(id)}
                variant="ghost"
              >
                <StarIcon
                  className={cn("size-5 text-[#6254B4]", {
                    "fill-[#FE6B35] stroke-[#FE6B35]": isFeatured,
                  })}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Make this {isFeatured ? "unfeatured" : "featured"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>}
      <div className="absolute start-4.5 top-4.5">
        {type === 1 ?
          
          <div className="rounded-full bg-white px-3 py-1.5 font-medium text-[.875rem] text-[#6254B4]">
       Sale
        </div>:<div className="rounded-full bg-[#6254B4] px-3 py-1.5 font-medium text-[.875rem] text-white">Rent</div>}
      </div>
      <div className="clamp-[p,.5625rem,1.0625rem] flex w-full flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-[#81818B] text-[.875rem]">
            {subCategoryName}
          </p>
          <p className="clamp-[text,.875rem,1rem] shrink-0 font-semibold text-[#1B1DC8]">
            <span className="font-bold text-[#2C3A61] text-[1.4375rem]">
           <span className="font-normal">   $&nbsp;</span>{formatPrice(price)}
            </span>
            <span className="font-semibold text-[#81818B] text-[.9375rem]">
              {type === 2 ? "/mo" : ""}
            </span>
          </p>
        </div>
        <div className="h-px w-full bg-[#F2F2F5]" />
        <h6 className="font-semibold text-[#6254B4] min-h-[4.8ch]  capitalize text-[1.125rem]">
          {title}
        </h6>
        <div className="flex items-center gap-1.75">
          <Image alt="map-pin" className="mb-0.5 size-5" src={mapPinIcon} />
          <p className="font-semibold text-[#81818B] text-[13px]">{location}</p>
        </div>

        <div className=" text-[#81818B] text-[.8125rem]">Property ID: <span className="font-semibold">{propertyId}</span></div>
        <div className="flex gap-1">
          <div className="basis-1/3 text-[#81818B] text-[.8125rem]">
            <div>Category:</div>
            <div className="mt-0.5 font-semibold">
              {EnumHelper.getKeyName(PropertyCategoryEnum, category)}
            </div>
          </div>
          <div className="basis-1/3 text-[#81818B] text-[.8125rem]">
            <div>Posted On:</div>
            <div className="mt-0.5 font-semibold">{formatDate(postedOn)}</div>
          </div>
          <div className="basis-1/3 text-[#81818B] text-[.8125rem]">
            <div>Status:</div>
            <div className="mt-0.5 capitalize font-semibold">
              {EnumHelper.getKeyName(
                VerificationStatusEnum,
                verificationStatus
              )}
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-[#F2F2F5]" />

        <div className="flex items-center justify-between">
       {verificationStatus=== 1&&   <div className="flex-1 flex self-stretch items-center justify-center border-r border-[#E5E7EB]">
            <Switch
              checked={status === 1}
              className="scale-110 cursor-pointer data-[state=checked]:bg-[#00E900]"
              disabled={isLoading}
              onCheckedChange={() => onToggleStatus?.(id)}
            />
          </div>}
          <div className="flex-1 flex items-center justify-center border-r border-[#E5E7EB]">
            <Link href={`/my-listings/${id}`}>
              <Button className="cursor-pointer" variant="ghost">
                <Image alt="eye" className="size-6" src={eyeIcon} />
              </Button>
            </Link>
          </div>
          {verificationStatus !== 3 &&
            <div className="flex-1 flex items-center justify-center border-r border-[#E5E7EB]">
            <Link href={`/list-your-property?id=${id}`}>
              <Button className="cursor-pointer" variant="ghost">
                <Image alt="pencil" className="size-4.75" src={pencilIcon} />
              </Button>
            </Link>
          </div>}
          <div className="flex-1 flex items-center justify-center">
            <Button
              className="cursor-pointer"
              onClick={() => onDelete?.(id)}
              variant="ghost"
            >
              <Image alt="bin" className="size-5.25" src={binIcon} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
