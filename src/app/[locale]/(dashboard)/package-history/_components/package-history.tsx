import eyeIcon from "@public/icons/eye.svg";
import Image from "next/image";
import LoadingButton from "@/app/[locale]/_components/auth-components/loading-button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchByExpiry from "./search-by-expiry-date";
import SearchById from "./search-by-id";
import SearchByStatus from "./search-by-status";
import SearchIcon from "./search-icon";
import SortByExpiryDate from "./sort-by-expiry-date";

const tableData = [
  {
    id: "UR-123456789",
    packageName: "Promo1",
    purpose: "Sell",
    packageType: "Promotion",
    purchasedOn: "27 Aug 2023",
    expireOn: "27 Aug 2023",
    validity: "60 Days",
    price: "£ 634,000/mo",
    status: "Approved",
  },
  {
    id: "UR-123456789",
    packageName: "Silver",
    purpose: "Sell",
    packageType: "Subscription",
    purchasedOn: "27 Aug 2023",
    expireOn: "27 Aug 2023",
    validity: "60 Days",
    price: "£ 634,000/mo",
    status: "Approved",
  },
  {
    id: "UR-123456789",
    packageName: "Promo2",
    purpose: "Rent",
    packageType: "Promotion",
    purchasedOn: "27 Aug 2023",
    expireOn: "27 Aug 2023",
    validity: "120 Days",
    price: "£ 634,000/mo",
    status: "Pending",
  },
  {
    id: "UR-123456789",
    packageName: "Silver",
    purpose: "Rent",
    packageType: "Subscription",
    purchasedOn: "27 Aug 2023",
    expireOn: "27 Aug 2023",
    validity: "30 Days",
    price: "£ 634,000/mo",
    status: "Approved",
  },
  {
    id: "UR-123456789",
    packageName: "Promo2",
    purpose: "Rent",
    packageType: "Promotion",
    purchasedOn: "27 Aug 2023",
    expireOn: "27 Aug 2023",
    validity: "60 Days",
    price: "£ 634,000/mo",
    status: "Approved",
  },
  {
    id: "UR-123456789",
    packageName: "Promo2",
    purpose: "Sell",
    packageType: "Promotion",
    purchasedOn: "27 Aug 2023",
    expireOn: "27 Aug 2023",
    validity: "120 Days",
    price: "£ 634,000/mo",
    status: "Approved",
  },
];

const PackageHistory = () => (
  <div className="p-4">
    <div className="mb-6 flex flex-wrap items-center gap-3 md:gap-[18px]">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <SearchById />
          <div className="max-md:hidden">
            {" "}
            <SearchByExpiry />
          </div>

          <div className="max-md:hidden">
            {" "}
            <SearchByStatus />
          </div>

          <div className="max-md:hidden">
            <SearchIcon />
          </div>
          <button
            className="clamp-[gap,6px,8px] flex h-[44px] items-center rounded-[6px] border border-[#6254B4] bg-white font-medium text-white max-md:px-[12px] md:hidden"
            type="button"
          >
            <span className="text-[#6254B4]">Filter</span>
          </button>
          <LoadingButton />
        </div>
      </div>
      <div className="ml-auto max-md:hidden">
        {" "}
        <SortByExpiryDate />
      </div>
    </div>

    <div className="hidden lg:block">
      <div className="flex h-[50px] w-full items-center rounded-tl-[4px] rounded-tr-[4px] bg-[#6254B4] px-[20px]">
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Transaction ID
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Package name
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Purpose
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Package type
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Purchased on
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Expire on
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Validity
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Price
        </p>
        <p className="flex-1 font-jost font-medium text-[13px] text-white leading-[22px]">
          Status
        </p>
        <div className="flex-1" />
        <div className="flex-1" />
      </div>

      {tableData.map((row, index) => (
        <div
          className={`flex w-full items-center px-[20px] py-[18px] ${
            index % 2 === 0 ? "bg-[#F0F0F01A]" : "bg-[#6254B417]"
          }`}
          key={`${row.id}-${row.packageName}-${row.purpose}-${row.validity}-${index}`}
        >
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.id}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.packageName}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.purpose}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.packageType}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.purchasedOn}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.expireOn}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.validity}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.price}
          </p>
          <p className="flex-1 font-jost font-normal text-[#2C3A61] text-[13px] leading-[22px]">
            {row.status}
          </p>
          <div className="flex flex-1 items-center">
            {row.status === "Pending" && (
              <button
                className="rounded-[4px] bg-[#FF6B2C] px-[16px] py-[6px] font-jost font-medium text-[12px] text-white transition-colors hover:bg-[#e55a1f]"
                type="button"
              >
                Pay now
              </button>
            )}
          </div>
          <div className="flex flex-1 items-center justify-center">
            <button
              aria-label="View details"
              className="transition-opacity hover:opacity-70"
              type="button"
            >
              <Image alt="View" height={20} src={eyeIcon} width={20} />
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6.5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="bg-[#F0F0F0]" href="#">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className="border-0 bg-[#2C3A61] font-semibold text-white hover:bg-[#2C3A61] hover:text-white"
                href="#"
                isActive
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>

    <div className="space-y-4 lg:hidden">
      {tableData.map((row, index) => (
        <div
          className="rounded-lg border border-[#E0E0E0] bg-white p-4 shadow-sm"
          key={`${row.id}-${row.packageName}-${row.purpose}-${row.validity}-${index}`}
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="font-jost font-medium text-[#6254B4] text-xs">
                Transaction ID
              </p>
              <p className="font-jost font-medium text-[#2C3A61] text-sm">
                {row.id}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 font-medium text-xs ${
                row.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {row.status}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-jost text-[#6254B4] text-xs">Package:</span>
              <span className="font-jost text-[#2C3A61] text-sm">
                {row.packageName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-jost text-[#6254B4] text-xs">Purpose:</span>
              <span className="font-jost text-[#2C3A61] text-sm">
                {row.purpose}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-jost text-[#6254B4] text-xs">Type:</span>
              <span className="font-jost text-[#2C3A61] text-sm">
                {row.packageType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-jost text-[#6254B4] text-xs">
                Purchased:
              </span>
              <span className="font-jost text-[#2C3A61] text-sm">
                {row.purchasedOn}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-jost text-[#6254B4] text-xs">Expires:</span>
              <span className="font-jost text-[#2C3A61] text-sm">
                {row.expireOn}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-jost text-[#6254B4] text-xs">
                Validity:
              </span>
              <span className="font-jost text-[#2C3A61] text-sm">
                {row.validity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-jost text-[#6254B4] text-xs">Price:</span>
              <span className="font-jost font-medium text-[#2C3A61] text-sm">
                {row.price}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {row.status === "Pending" && (
              <button
                className="flex-1 rounded-[4px] bg-[#FF6B2C] px-4 py-2 font-jost font-medium text-sm text-white transition-colors hover:bg-[#e55a1f]"
                type="button"
              >
                Pay now
              </button>
            )}
            <button
              className="rounded-[4px] border border-[#6254B4] bg-white px-4 py-2 font-jost font-medium text-[#6254B4] text-sm transition-colors hover:bg-[#6254B4] hover:text-white"
              type="button"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PackageHistory;
