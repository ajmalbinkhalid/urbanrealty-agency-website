"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { propertiesApi } from "@/api/properties-api";
import LocationIcon from "@/components/svg/location-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/provider/route-progress-provider";
import { FurnishingEnum, PropertyCategoryEnum } from "@/utils/enum";
import { EnumHelper } from "@/utils/enum-helper";

const PropertyViewCard = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => propertiesApi.getPropertyDetails(propertyId),
  });

  const deletePropertyMutation = useMutation({
    mutationFn: () => propertiesApi.deleteProperty(propertyId),
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      router.push("/my-listings");
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: () => propertiesApi.toggleStatus(propertyId),
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
    },
  });

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    deletePropertyMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        Error loading property details.
      </div>
    );
  }

  const property = data.data.property;
  const info = property.propertyInformation;
  const features = property.keyFeatures;
  const galleryImages = [
    property.coverImage,
    ...(property.galleryImages ?? []),
  ].filter(Boolean);

  const getVerificationStatusBadge = (status: number) => {
    const statusMap: Record<number, { label: string; color: string }> = {
      1: { label: "Published", color: "bg-green-100 text-green-800" },
      2: { label: "Rejected", color: "bg-red-100 text-red-800" },
      3: { label: "Verification Pending", color: "bg-yellow-100 text-yellow-800" },
      0: {
        label: "Draft",
        color: "bg-orange-100 text-[#FE6B35]",
      },
    };
    const status_info = statusMap[status] || {
      label: "Unknown",
      color: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`rounded-full px-3 py-1 font-medium text-sm ${status_info.color}`}
      >
        {status_info.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-white">
      <div className="clamp-[px,14px,36px] clamp-[py,14px,36px] grid gap-8 drop-shadow-2xl lg:grid-cols-3">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-1  lg:sticky h-fit lg:top-[7rem] ">
          {galleryImages.length > 0 && (
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative overflow-hidden w-full clamp-[h,200px,400px] rounded-lg bg-gray-100">
                <Image
                  alt="Property main"
                  className=" w-full object-cover"
                fill
                  src={galleryImages[currentImageIndex]}
                 
                />
                {/* Navigation Arrows */}
                <button
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100"
                  onClick={handlePrevImage}
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
                <button
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100"
                  onClick={handleNextImage}
                  type="button"
                >
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>
              </div>
              {/* Thumbnail Images */}
              <div className="flex overflow-x-auto  pb-4  gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    className={` overflow-hidden rounded-lg  w-[8.0625rem] h-[5.5rem]  border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                    key={img}
                    onClick={() => setCurrentImageIndex(idx)}
                    type="button"
                  >
                    <Image
                      alt={`Thumbnail ${idx}`}
                      className="h-full w-full object-cover"
                      height={200}
                      src={img}
                      width={200}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Property Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Top Actions */}
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 inline-block rounded-full bg-[#6254B4] px-3 py-1 font-jost text-sm text-white">
               {property.purpose ===1? "Sale":"Rent"} 
              </div>
              <h1 className="mb-2 font-jost capitalize text-3xl text-[#6254B4]">
                {info.title}
              </h1>
              <div className="flex items-center capitalize font-medium gap-2 text-gray-600">
                <LocationIcon />
                {info.locationName}
              </div>
            </div>
            <div className="flex items-center gap-5">
              {property.verificationStatus ===  1&& <div className="px-2">
                <Switch
                  checked={data?.data?.property?.status === 1}
                  className="mt-1 scale-110 cursor-pointer data-[state=checked]:bg-[#00E900]"
                  disabled={toggleStatusMutation.isPending}
                  onCheckedChange={() => toggleStatusMutation.mutate()}
                />
              </div>}
              {property.verificationStatus !== 3 && (
                            
              <Link href={`/list-your-property?id=${propertyId}`}>
                <Button
                  className="bg-[#6254B4]/9 px-2! text-[#6254B4] hover:text-[#6254B4]/80"
                  variant="ghost"
                >
                  <Pencil className="size-5.25" />
                </Button>
              </Link>)}
              <Button
                className="bg-[#6254B4]/9 px-2! text-[#6254B4] hover:text-red-600"
                disabled={deletePropertyMutation.isPending}
                onClick={handleDeleteClick}
                variant="ghost"
              >
                <Trash2 className="size-5.25" />
              </Button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-jost font-bold text-4xl text-gray-600">$</span>
            <span className="font-bold text-4xl">{info.price}</span>
         {property.purpose !==1 &&   <span className="text-gray-600">/mo</span>}
          </div>

          {/* Posted Info */}
          <div className="flex gap-8  py-4">
            <div>
              <p className="font-medium text-[#1800AD] text-sm">Posted on:</p>
              <p className="font-medium text-gray-600">
                {formatDate(property.createdAt)}
              </p>
            </div>
            <div>
              <p className="font-medium text-[#1800AD] text-sm">Status:</p>
              <div className="mt-1">
                {getVerificationStatusBadge(property.verificationStatus)}
              </div>
            </div>
          </div>

          {/* Property Information Section */}
          <div>
            <h2 className="clamp-[px,8px,20px] mb-1  bg-[#6254B4]/10 py-[7px] font-medium text-[#1800AD] text-lg leading-[100%]">
              Property information
            </h2>
            <div className="clamp-[px,8px,20px] text-[16px] clamp-[pt,24px,30px] grid gap-4 lg:grid-cols-3">
              <div>
                <p className="font-medium text-[#1800AD] ">Landmark</p>
                <p className="text-gray-600 capitalize">{info.landmark}</p>
              </div>
              <div>
                <p className="font-medium text-[#1800AD] ">Category</p>
                <p className="text-gray-600">              {EnumHelper.getKeyName(PropertyCategoryEnum, property.propertyCategoryId)}
</p>
              </div>

              {info.propertySubCategoryName && (
                <div>
                  <p className="font-medium text-[#1800AD] ">Type</p>
                  <p className="text-gray-600">{info.propertySubCategoryName}</p>
                </div>)}
            </div>
          </div>
            <div className="clamp-[px,8px,20px] text-[16px]">
              <p className="font-medium text-[#1800AD] ">Description</p>
              <p className="mt-2 text-gray-600 capitalize">{info.description}</p>
            </div>

          <div>
            <h2 className="clamp-[px,8px,20px] mb-1  bg-[#6254B4]/10 py-[7px] font-medium text-[#1800AD] text-lg leading-[100%]">
              Key features
            </h2>
            <div className="clamp-[px,8px,20px] clamp-[py,24px,39px] text-[16px] grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {features.noOfBedroom &&  <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
                  No. of bedroom
                </p>
                <p className="clamp-[text,16px,18px] font-medium text-gray-600">
                  {features.noOfBedroom}
                </p>
              </div>}
             {features.noOfBathroom && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
                  No. of bathroom
                </p>
                <p className="font-medium text-gray-600">
                  {features.noOfBathroom}
                </p>
              </div>}
             {features.totalFloor && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
Total Floors                </p>
                <p className="font-medium text-gray-600">
                  {features.totalFloor}
                </p>
              </div>}
             {features.floorNumber && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
 Floor Number             </p>
                <p className="font-medium text-gray-600">
                  {features.floorNumber}
                </p>
              </div>}
             {features.customerShip && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
 Customer Ship            </p>
                <p className="font-medium text-gray-600">
                  {features.customerShip}
                </p>
              </div>}
             {features.propertyCondition && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
Property Condition           </p>
                <p className="font-medium text-gray-600">
                  {features.propertyCondition}
                </p>
              </div>}
             {features.zoneType && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
Zone Type          </p>
                <p className="font-medium text-gray-600">
                  {features.zoneType}
                </p>
              </div>}
             {features.locationHub && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
Location Hub          </p>
                <p className="font-medium text-gray-600">
                  {features.locationHub}
                </p>
              </div>}
            {info.area &&  <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
                  Area (sqft)
                </p>
                <p className="font-medium text-gray-600">{info.area}</p>
              </div>}
             {features.propertyAge && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">
                  Property Establish year
                </p>
                <p className="text-gray-600">
                  {features.propertyAge === 0 ? "New" : features.propertyAge}
                </p>
              </div>}
            {features.furnishing && <div className="gap grid">
                <p className="font-medium text-[#1800AD] ">Furnishing</p>
                <p className="text-gray-600">
                  {EnumHelper.getKeyName(FurnishingEnum, features.furnishing) }
                </p>
              </div>}
            </div>

           
            {property.amenities && property.amenities.length > 0 && (
              <div>
            <h2 className="clamp-[px,8px,20px] mb-4  bg-[#6254B4]/10 py-[7px] font-medium text-[#1800AD] text-lg leading-[100%]">
                  Amenities
                </h2>
                <div className="clamp-[px,8px,20px] grid gap-3 lg:grid-cols-3">
                  {property.amenities.map((amenity) => (
                    <div className="flex items-center gap-3" key={amenity._id}>
                     <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 2.02941L4.73529 8.79412L0 4.05882L2.02941 2.02941L4.73529 4.73529L9.47059 0L11.5 2.02941Z" fill="#1800AD"/>
</svg>

                      <span className="text-gray-900">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
    </div>
  );
};

export default PropertyViewCard;
