"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { propertiesApi } from "@/api/properties-api";
import LoadingButton from "@/app/[locale]/_components/auth-components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import PropertyCard from "./property-card";
import SearchByLoaction from "./search-by-location";
import SearchByName from "./search-by-name";
import SearchByStatus from "./search-by-status";
import SearchByType from "./search-by-type";
import SortByDate from "./sort-by-date";
import ButtonModal from "@/app/[locale]/_components/home-page-components/ButtonModal";
import { PackageTypeEnum } from "@/api/enum";

const MyListingCard = () => {

  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState("0");
  const [searchName, setSearchName] = useState("");
  const [appliedSearchName, setAppliedSearchName] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [appliedStatus, setAppliedStatus] = useState(status);
  const [appliedLocation, setAppliedLocation] = useState(location);
  const [appliedCategory, setAppliedCategory] = useState(category);

  const onSearch = () => {
    setAppliedSearchName(searchName);
    setAppliedStatus(status);
    setAppliedCategory(category);
    setAppliedLocation(location);
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "properties",
      activeFilter,
      appliedSearchName,
      appliedStatus,
      appliedCategory,
      appliedLocation,
      sort,
    ],
    queryFn: () =>
      propertiesApi.getAllProperties({
        purpose: activeFilter,
        search: appliedSearchName,
        verificationStatus: appliedStatus,
        category: appliedCategory,
        location: appliedLocation,
        sort,
      }),
  });

  const handleReset = () => {
    setActiveFilter("0");
    setSearchName("");
    setStatus("");
    setCategory("");
    setLocation("");

    // clear applied filters too
    setAppliedSearchName("");
    setAppliedStatus("");
    setAppliedCategory("");
    setAppliedLocation("");
  };

  const toggleStatusMutation = useMutation({
    mutationFn: (propertyId: string) => propertiesApi.toggleStatus(propertyId),
    onSuccess: () => {
      toast.success("Property status updated");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: () => {
      toast.error("Failed to update property status");
    },
    onSettled: () => {
      setSelectedPropertyId(null);
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: (propertyId: string) =>
      propertiesApi.toggleFeatured(propertyId),
    onSuccess: () => {
      toast.success("Featured status updated");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: () => {
      toast.error("Failed to update featured status");
    },
    onSettled: () => {
      setSelectedPropertyId(null);
    },
  });

  const deletePropertyMutation = useMutation({
    mutationFn: (propertyId: string) =>
      propertiesApi.deleteProperty(propertyId),
    onSuccess: () => {
      toast.success("Property deleted successfully");
      setShowDeleteDialog(false);
      setSelectedPropertyId(null);
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: () => {
      toast.error("Failed to delete property");
    },
  });

  const handleToggleStatus = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    toggleStatusMutation.mutate(propertyId);
  };

  const handleToggleFeatured = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    toggleFeaturedMutation.mutate(propertyId);
  };

  const handleDeleteClick = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setShowDeleteDialog(true);
  };

  const [openMobileFilter, setOpenMobileFilter] = useState(false);

  const handleConfirmDelete = () => {
    if (selectedPropertyId) {
      deletePropertyMutation.mutate(selectedPropertyId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="clamp-[px,16px,29px] bg-white rounded-[6px] flex justify-between clamp-[py,14px,20px]">

      <div className="flex gap-[30px]  items-center">
          <p className="text-[#81818B] font-medium">Your current subscription plan: <span className="text-[#6254B4] text-[18px] font-semibold">Silver</span> </p>
  
          <p className="text-[#81818B] font-medium">Properties listed: <span className="text-[#6254B4] text-[18px] font-semibold">3/5</span></p>
            <ButtonModal
                              title="Subscription"
                              trigger={
                                <button
                                  className="clamp-[px,10px,13px] h-fit rounded-[6px] bg-[#FE6B35] py-[6px] font-medium text-center font-jost text-[14px] text-white"
                                  type="button"
                                >
                                Upgrade package now
                                </button>
                              }
                              type={PackageTypeEnum.Subscription}
                            />
        </div>
        <div className="flex items-center gap-[8px]"><p className="text-[#81818B] font-medium">Filter properties:</p>
        
        <button className="text-[#6254B4] px-[15px] py-[13px] leading-[100%] bg-[#6254B417] rounded-[6px]">All</button>
        <button className="bg-[#6254B4] px-[15px] py-[13px] leading-[100%] font-semibold text-[#fff] rounded-[6px]">Paid</button>
        <button className="text-[#6254B4] px-[15px] py-[13px] leading-[100%] bg-[#6254B417] rounded-[6px]">Free</button>
        <button className="text-[#6254B4] px-[15px] py-[13px] leading-[100%] bg-[#6254B417] rounded-[6px]">Draft</button>
        </div>
      </div>
     <div className="w-full rounded-[.375rem] bg-white shadow-[0px_10px_20px_0px_rgba(59,77,129,0.08)]">
        <div className="clamp-[p,1rem,1.5rem] relative flex flex-col">
          <div className="mb-6 flex justify-between clamp-[gap,8px,16px]">
            <div className="flex flex-wrap max-xl:w-full items-center clamp-[gap,8px,16px]">
              <div className="flex items-center gap-2 rounded-[6px] bg-[#F8F8FF] px-[6px] py-[6px] max-md:w-full max-xl:justify-between">
                <button
                  className={`rounded-md px-4 py-2 max-md:w-1/3 font-medium text-sm transition-colors ${
                    activeFilter === "0"
                      ? "bg-[#6C5DD3] text-white shadow-sm"
                      : "bg-transparent text-gray-600 hover:bg-white/50"
                  }`}
                  onClick={() => setActiveFilter("0")}
                  type="button"
                >
                  All
                </button>
    
                <button
                  className={`rounded-md  max-md:w-1/3   px-4 py-2 font-medium text-sm transition-colors ${
                    activeFilter === "1"
                      ? "bg-[#6C5DD3] text-white shadow-sm"
                      : "bg-transparent text-gray-600 hover:bg-white/50"
                  }`}
                  onClick={() => setActiveFilter("1")}
                  type="button"
                >
                  Sell
                </button>
    
                <button
                  className={`rounded-md  max-md:w-1/3   px-4 py-2 font-medium text-sm transition-colors ${
                    activeFilter === "2"
                      ? "bg-[#6C5DD3] text-white shadow-sm"
                      : "bg-transparent text-gray-600 hover:bg-white/50"
                  }`}
                  onClick={() => setActiveFilter("2")}
                  type="button"
                >
                  Rent
                </button>
              </div>
              <SearchByName className="w-full md:clamp-[w,150px,224px] xl:clamp-[w,50px,224px]"  onChange={setSearchName} value={searchName} />
    
              <div className="max-xl:hidden">
                {" "}
                <SearchByType category={category} setCategory={setCategory} />
              </div>
              <div className="max-xl:hidden">
                {" "}
                <SearchByLoaction location={location} setLocation={setLocation} />
              </div>
              <div className="max-xl:hidden">
                {" "}
                <SearchByStatus setStatus={setStatus} status={status} />
              </div>
               <div className="2xl:hidden">
              <SortByDate setSort={setSort} sort={sort} />
              </div>{" "}
                <button
                className="clamp-[gap,6px,8px] flex items-center rounded-[6px] border border-[#6254B4] bg-white px-[10px] py-[10px] font-medium text-white max-md:px-[12px] xl:hidden max-md:hidden"
                onClick={() => setOpenMobileFilter(true)}
                type="button"
              >
                <span className="text-[#6254B4]">Filter</span>
              </button>
              <Button
                aria-label="search"
                className="flex size-[46px] items-center justify-center rounded-[6px] bg-[#1800AD] hover:bg-[#3825b4] max-md:hidden"
                onClick={onSearch}
                type="button"
              >
                <SearchIcon className="size-[1.25rem]" />
              </Button>
              <button
                className="clamp-[gap,6px,8px] flex items-center rounded-[6px] border border-[#6254B4] bg-white px-[10px] py-[10px] font-medium text-white max-md:px-[12px] md:hidden"
                onClick={() => setOpenMobileFilter(true)}
                type="button"
              >
                <span className="text-[#6254B4]">Filter</span>
              </button>
            
              <LoadingButton handleLoading={handleReset} />
            </div>
            <div className="max-2xl:hidden">
              <SortByDate setSort={setSort} sort={sort} />
            </div>{" "}
          </div>
    
          <div className="clamp-[mb,1.5rem,1.25rem] font-medium text-[#81818B] text-[1rem]">
            Total {data?.data.properties.items.length ?? 0} Properties listed
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.data.properties.items.map((item) => {
    
                console.log(item)
                return(
                  <PropertyCard
                    propertyId={item.propertyId}
                  category={item.propertyCategoryId}
                  id={item._id}
                  image={item.coverImage}
                  isFeatured={item.isFeatured}
                  isLoading={
                    item._id === selectedPropertyId &&
                    (toggleStatusMutation.isPending ||
                      toggleFeaturedMutation.isPending ||
                      deletePropertyMutation.isPending)
                  }
                  key={item._id}
                  location={item.propertyInformation.locationName}
                  onDelete={handleDeleteClick}
                  onToggleFeatured={handleToggleFeatured}
                  onToggleStatus={handleToggleStatus}
                  postedOn={item.createdAt}
                  price={item.propertyInformation.price}
                  status={item.status}
                  subCategoryName={item.propertyInformation.propertySubCategoryName}
                  title={item.propertyInformation.title}
                  type={item.purpose}
                  verificationStatus={item.verificationStatus}
                />
              )})}
            </div>
    
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
                    {/* <PaginationEllipsis /> */}
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
    
          {/* Delete Confirmation Dialog */}
          <Dialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Property</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this property? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  disabled={deletePropertyMutation.isPending}
                  onClick={() => setShowDeleteDialog(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  disabled={deletePropertyMutation.isPending}
                  onClick={handleConfirmDelete}
                  variant="destructive"
                >
                  {deletePropertyMutation.isPending ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Property"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* ================= MOBILE FILTER OVERLAY ================= */}
          {openMobileFilter && (
            <div className="fixed inset-0 z-[100] overflow-visible bg-white md:hidden">
              <div className="flex h-full flex-col p-4">
                {/* HEADER */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full text-xl hover:bg-gray-100"
                    onClick={() => setOpenMobileFilter(false)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
    
                {/* FILTER CONTENT */}
                <div className="w-full space-y-4">
                  <SearchByType  category={category} setCategory={setCategory} />
                  <SearchByLoaction location={location} setLocation={setLocation} />
                  <SearchByStatus setStatus={setStatus} status={status} />
                </div>
    
                {/* FOOTER */}
                <div className="mt-auto flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleReset();
                      setOpenMobileFilter(false);
                    }}
                    variant="outline"
                  >
                    Reset
                  </Button>
    
                  <Button
                    className="flex-1"
                    onClick={() => {
                      onSearch();
                      setOpenMobileFilter(false);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
     </div>
   </div>
  );
};

export default MyListingCard;
