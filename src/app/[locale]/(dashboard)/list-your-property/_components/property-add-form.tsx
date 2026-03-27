"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { frontendApi } from "@/api/frontend-api";
import { propertiesApi } from "@/api/properties-api";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { PropertyFormSchema } from "@/lib/property-form-schema";
import { cn } from "@/lib/utils";
import { useRouter } from "@/provider/route-progress-provider";
import {
  CustomerShipEnum,
  FurnishingEnum,
  LocationHubEnum,
  PossessionStatusEnum,
  PropertyCategoryEnum,
  PropertyConditionEnum,
  PropertyPurposeEnum,
  ZoneTypeEnum,
} from "@/utils/enum";
import { urlToFile } from "@/utils/url-to-file";
import CustomCheckbox from "./custom-checkbox";
import CustomComboBox from "./custom-combobox";
import CustomInput from "./custom-input";
import CustomTextarea from "./custom-text-area";
import { FileUploadGalleryContent, FileUploadListContent } from "./file-upload";
import LocationPoints from "./location-points";

type PropertyFormData = z.infer<typeof PropertyFormSchema>;

const PropertyAddForm = ({ propertyId }: { propertyId: string }) => {
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [isNewFileSelected, setIsNewFileSelected] = useState(false);

  const isEditMode = !!propertyId;

  const { data, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => {
      if (!propertyId) {
        throw new Error("propertyId is required");
      }
      return propertiesApi.getPropertyDetails(propertyId);
    },
    enabled: Boolean(propertyId),
  });

  const [submitType, setSubmitType] = useState<"draft" | "create" | "">("");

  const property = data?.data.property;

  const router = useRouter();
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      purpose: "1",
      category: "1",
      title: { en: property?.propertyInformation.title ?? "", ar: "" },
      description: { en: "", ar: "" },
      landmark: { en: "", ar: "" },
      locationId: "",
      propertyTypeId: "",
      possessionStatus: "",
      availableFrom: undefined,
      area: "",
      price: "",
      propertyAge: 0,
      furnishing: "",
      bedrooms: "",
      bathrooms: "",
      zoneType: "",
      locationHub: "",
      propertyCondition: "",
      customership: "",
      totalFloors: "",
      floorNumber: "",
      amenities: [],
      coverImage: undefined,
      galleryImages: [],
      location: {
        latitude: 33.8938,
        longitude: 35.5018,
      },
      address: "",
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const selectedPurpose = watch("purpose");
  const selectedCategory = watch("category");
  const selectedPossession = watch("possessionStatus");

  // biome-ignore lint/correctness/useExhaustiveDependencies: purpose is the only dependency needed
  useEffect(() => {
    if (isEditMode && property) return;
    setValue("category", "1");
  }, [selectedPurpose, isEditMode, property, setValue]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: category is the only dependency needed
  useEffect(() => {
    if (isEditMode && property) return;

    setValue("propertyTypeId", "");
    setValue("furnishing", "");
    setValue("bedrooms", "");
    setValue("bathrooms", "");
    setValue("zoneType", "");
    setValue("locationHub", "");
    setValue("propertyCondition", "");
    setValue("customership", "");
    setValue("totalFloors", "");
    setValue("floorNumber", "");
  }, [selectedCategory, isEditMode, property, setValue]);

  useEffect(() => {
    if (!(isEditMode && property) || isInitialLoadComplete) return;

    if (!property) {
      return;
    }

    const loadPropertyData = async () => {
      try {
        // Load cover image
        let coverFile: File | undefined;
        if (property.coverImage) {
          try {
            coverFile = await urlToFile(
              property.coverImage,
              `cover-${Date.now()}.jpg`
            );
          } catch (err) {
            console.error("Failed to load cover image:", err);
          }
        }

        // Load gallery images
        let galleryFiles: File[] = [];
        if (property.galleryImages?.length) {
          try {
            galleryFiles = await Promise.all(
              property.galleryImages.map((url: string, index: number) =>
                urlToFile(url, `gallery-${Date.now()}-${index}.jpg`)
              )
            );
          } catch (err) {
            console.error("Failed to load gallery images:", err);
          }
        }

        // Format availableFrom date if exists
        let availableFromDate = "";
        if (property.propertyInformation?.availableFrom) {
          const date = new Date(property.propertyInformation.availableFrom);
          availableFromDate = date.toISOString().split("T")[0];
        }

        // Prepare form data
        const formData = {
          purpose: String(property.purpose || "1"),
          category: String(property.propertyCategoryId || "1"),
          title: {
            en: property.propertyInformation?.titleObject?.en || "",
            ar: property.propertyInformation?.titleObject?.ar || "",
          },
          description: {
            en: property.propertyInformation?.descriptionObject?.en || "",
            ar: property.propertyInformation?.descriptionObject?.ar || "",
          },
          landmark: {
            en: property.propertyInformation?.landmarkObject?.en || "",
            ar: property.propertyInformation?.landmarkObject?.ar || "",
          },
          locationId: property.propertyInformation?.locationId || "",
          propertyTypeId:
            property.propertyInformation?.propertySubCategoryId || "",
          possessionStatus: String(
            property.propertyInformation?.possessionStatus || ""
          ),
          availableFrom: availableFromDate,
          area: String(property.propertyInformation?.area || ""),
          price: property.propertyInformation?.price || "",
          propertyAge: property.keyFeatures?.propertyAge || 0,
          furnishing: String(property.keyFeatures?.furnishing || ""),
          bedrooms: String(property.keyFeatures?.noOfBedroom || ""),
          bathrooms: String(property.keyFeatures?.noOfBathroom || ""),
          zoneType: String(property.keyFeatures?.zoneType || ""),
          locationHub: String(property.keyFeatures?.locationHub || ""),
          propertyCondition: String(
            property.keyFeatures?.propertyCondition || ""
          ),
          customership: String(property.keyFeatures?.customerShip || "44"),
          totalFloors: String(property.keyFeatures?.totalFloor || ""),
          floorNumber: String(property.keyFeatures?.floorNumber || ""),
          amenities: property.amenitiesId || [],
          location: {
            latitude:
              property.propertyInformation?.location?.coordinates?.[1] ||
              25.276_987,
            longitude:
              property.propertyInformation?.location?.coordinates?.[0] ||
              55.296_249,
          },
          address: property.propertyInformation?.address || "",
          coverImage: coverFile,
          galleryImages: galleryFiles,
        };

        reset(formData);
        setIsInitialLoadComplete(true);
      } catch (error) {
        console.error("Failed to load property data:", error);
        toast.error("Failed to load property data");
      }
    };

    loadPropertyData();
  }, [property, isEditMode, reset, isInitialLoadComplete]);

  const submitMutation = useMutation({
    mutationFn: (data: PropertyFormData) =>
      isEditMode
        ? propertiesApi.updateProperty(propertyId, data)
        : propertiesApi.createProperty(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      setSubmitType("");
      router.push(`/my-listings/${res.data.property._id}`);
    },
  });

  const onSaveDraft = async () => {
    setSubmitType("draft");
    const allValues = form.getValues();

    const isValid = await form.trigger();

    if (!isValid) {
      // 👈 runs full validation
      toast.error("Please Complete the necessary fields before saving draft");
      return;
    }

    const data = {
      ...allValues,
      isDraft: true,
    };

    submitMutation.mutate(data);
  };

  const onSubmit = (data: PropertyFormData) => {
    setSubmitType("create");
    submitMutation.mutate(data);
  };

  if (isLoading || (isEditMode && !isInitialLoadComplete)) {
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background font-semibold text-[#5f5b70] text-lg">
      <Spinner className="size-10" />
    </div>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div className="clamp-[mb,32px,49px]">
            <label
              className="clamp-[text,1.1875rem,1.25rem] font-semibold text-[#1800AD]"
              htmlFor="purpose-input"
            >
              Purpose
            </label>
            <Controller
              control={control}
              name="purpose"
              render={({ field }) => (
                <RadioGroup
                  className="clamp-[mt,1.25rem,1.125rem] clamp-[gap,1.5rem,1.875rem]! flex"
                  disabled={submitMutation.isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {Object.entries(PropertyPurposeEnum).map(([label, value]) => {
                   if (
                      isEditMode &&
                      property?.verificationStatus !== 0 &&
                      property?.purpose !== value
                    ) {
                      return null;
                    }
                    return (
                      <div
                        className="clamp-[gap,.625rem,.8125rem] flex items-center"
                        key={value}
                      >
                        <RadioGroupItem
 disabled={
                            submitMutation.isPending ||
                            (isEditMode && property?.verificationStatus !== 0)
                          }                          id={`purpose-${value}`}
                          value={String(value)}
                        />
                        <Label
                          className="clamp-[text,1rem,1.125rem] cursor-pointer font-semibold text-[#2C3A61]"
                          htmlFor={`purpose-${value}`}
                        >
                          {label}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
            />
            {errors.purpose && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.purpose.message}
              </p>
            )}
          </div>

          <div className="clamp-[mb,32px,49px]">
            <label
              className="clamp-[text,1.1875rem,1.25rem] font-semibold text-[#1800AD]"
              htmlFor="category-input"
            >
              Category
            </label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <div className="clamp-[mt,1.25rem,1.125rem] clamp-[gap,.625rem,1.375rem]! flex flex-wrap">
                  {Object.entries(PropertyCategoryEnum)
                    .filter(
                      ([, value]) =>
                        !(
                          selectedPurpose === "2" &&
                          value === PropertyCategoryEnum.Land
                        )
                    )
                    .map(([label, value]) => {
                      const isAvailable =
                        !isEditMode ||
                        (isEditMode && property?.verificationStatus === 0) ||
                        (isEditMode && property?.propertyCategoryId === value);

                      if (!isAvailable) {
                        return null;
                      }
                      return (
                        <button
                          className={cn(
                            "clamp-[text,1rem,1.0625rem] clamp-[px,1rem,1.125rem] clamp-[py,.625rem,.9375rem] min-w-[15ch] cursor-pointer rounded-[.375rem] font-medium transition-all",
                            field.value === String(value)
                              ? "bg-[#1800AD] font-bold text-white"
                              : "border border-[#6254B4] bg-[#F9F9FF] text-[#6254B4] hover:border-gray-400"
                          )}
                          disabled={
                            submitMutation.isPending ||
                            (isEditMode &&
                              property?.verificationStatus !== 0 &&
                              property?.propertyCategoryId !== value)
                          }
                          key={value}
                          onClick={() => {
                            field.onChange(String(value));
                          }}
                          type="button"
                        >
                          {label}
                        </button>
                      );
                    })}
                </div>
              )}
            />
            {errors.category && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.category.message}
              </p>
            )}
          </div>
        </section>

        {/* Property Information Section */}
        <section className="clamp-[gap,1.25rem,1.875rem] clamp-[mb,32px,49px] flex flex-col">
          <h2 className="clamp-[text,1.1875rem,1.25rem] font-semibold text-[#1800AD]">
            Property Information
          </h2>

          <div className="clamp-[gap,1.25rem,1.875rem] grid grid-cols-1 md:grid-cols-2">
            <Controller
              control={control}
              name="title.en"
              render={({ field }) => (
                <CustomInput
                  label="Property Title (EN)"
                  placeholder="Enter property title"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.title?.en?.message}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="title.ar"
              render={({ field }) => (
                <CustomInput
                  label="Property Title (AR)"
                  placeholder="أدخل عنوان العقار"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.title?.ar?.message}
                  isRTL
                  required
                />
              )}
            />
          </div>

          <div className="clamp-[gap,1.25rem,1.875rem] grid grid-cols-1 md:grid-cols-2">
            <Controller
              control={control}
              name="description.en"
              render={({ field }) => (
                <CustomTextarea
                  label="Property Description (EN)"
                  placeholder="Enter property description"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.description?.en?.message}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="description.ar"
              render={({ field }) => (
                <CustomTextarea
                  label="Property Description (AR)"
                  placeholder="أدخل وصف العقار"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.description?.ar?.message}
                  isRTL
                  required
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="locationId"
            render={({ field }) => (
              <CustomComboBox
                apiFunction={frontendApi.getLocations}
                disabled={submitMutation.isPending}
                error={errors.locationId?.message}
                label="Location"
                name={field.name}
                onValueChange={field.onChange}
                required
                transformData={(data) =>
                  data.data.locations.map((item) => ({
                    id: item._id,
                    name: item.name,
                  }))
                }
                value={field.value}
              />
            )}
          />

          <LocationPoints
            address={form.watch("address")}
            disabled={submitMutation.isPending}
            error={errors.address?.message}
            latitude={form.watch("location.latitude")}
            longitude={form.watch("location.longitude")}
            onAddressChange={(address) => {
              form.setValue("address", address);
            }}
            onLocationChange={(lat, lng) => {
              form.setValue("location.latitude", lat);
              form.setValue("location.longitude", lng);
            }}
            required
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="landmark.en"
              render={({ field }) => (
                <CustomTextarea
                  label="Landmark (EN)"
                  placeholder="Enter nearby landmark"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.landmark?.en?.message}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="landmark.ar"
              render={({ field }) => (
                <CustomTextarea
                  label="Landmark (AR)"
                  placeholder="أدخل معلم قريب"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.landmark?.ar?.message}
                  isRTL
                  required
                />
              )}
            />
          </div>

          {selectedCategory !== "3" && (
            <Controller
              control={control}
              name="propertyTypeId"
              render={({ field }) => (
                <CustomComboBox
                  apiFunction={() =>
                    frontendApi.getSubCategories({
                      categoryId: selectedCategory,
                    })
                  }
                  disabled={submitMutation.isPending}
                  error={errors.propertyTypeId?.message}
                  label="Property Type"
                  name="propertyTypeId"
                  onValueChange={field.onChange}
                  queryKey={{ categoryId: selectedCategory }}
                  required
                  transformData={(data) =>
                    data.data.subCategories.map((e) => ({
                      id: e._id,
                      name: e.name,
                    }))
                  }
                  value={field.value}
                />
              )}
            />
          )}

          <Controller
            control={control}
            name="possessionStatus"
            render={({ field }) => (
              <CustomComboBox
                disabled={submitMutation.isPending}
                enumValues={PossessionStatusEnum}
                error={errors.possessionStatus?.message}
                label="Possession Status"
                name="possessionStatus"
                onValueChange={field.onChange}
                required
                value={field.value}
              />
            )}
          />

          {selectedPossession === "3" && (
            <Controller
              control={control}
              name="availableFrom"
              render={({ field }) => (
                <CustomInput
                  label="Available From"
                  type="date"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.availableFrom?.message}
                  required
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                />
              )}
            />
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="area"
              render={({ field }) => (
                <CustomInput
                  label="Area (Sqft)"
                  placeholder="Enter area in sqft"
                  type="number"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.area?.message}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <CustomInput
                  label="Price"
                  placeholder="Enter price"
                  {...field}
                  disabled={submitMutation.isPending}
                  error={errors.price?.message}
                  required
                />
              )}
            />
          </div>
        </section>

        {/* Key Features Section */}
        {selectedCategory !== "3" && (
          <section className="clamp-[gap,1.25rem,1.875rem] clamp-[mb,32px,49px] flex flex-col">
            <h2 className="clamp-[text,1.1875rem,1.25rem] font-semibold text-[#1800AD]">
              Key Features
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {(selectedCategory === "1" || selectedCategory === "2") && (
                <>
                  <Controller
                    control={control}
                    name="propertyAge"
                    render={({ field, fieldState }) => (
                      <CustomComboBox
                        disabled={submitMutation.isPending}
                        error={fieldState.error?.message}
                        label="Property Establish Year"
                        name="propertyAge"
                        onValueChange={field.onChange}
                        options={Array.from({ length: 127 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return { id: year, name: String(year) };
                        })}
                        value={field.value}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="furnishing"
                    render={({ field, fieldState }) => (
                      <CustomComboBox
                        disabled={submitMutation.isPending}
                        enumValues={FurnishingEnum}
                        error={fieldState.error?.message}
                        label="Furnishing"
                        name="furnishing"
                        onValueChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </>
              )}

              {selectedCategory ===
                String(PropertyCategoryEnum.Residential) && (
                <>
                  <Controller
                    control={control}
                    name="bedrooms"
                    render={({ field }) => (
                      <CustomInput
                        label="Number of Bedrooms"
                        placeholder="Enter number of bedrooms"
                        {...field}
                        disabled={submitMutation.isPending}
                        error={
                          (
                            errors as {
                              bedrooms?: Record<string, undefined>;
                            }
                          ).bedrooms?.message
                        }
                        required={selectedCategory === "1"}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="bathrooms"
                    render={({ field }) => (
                      <CustomInput
                        label="Number of Bathrooms"
                        placeholder="Enter number of bathrooms"
                        {...field}
                        disabled={submitMutation.isPending}
                        error={
                          (
                            errors as {
                              bathrooms?: Record<string, undefined>;
                            }
                          ).bathrooms?.message
                        }
                        required={selectedCategory === "1"}
                      />
                    )}
                  />
                </>
              )}

              {selectedCategory === "2" && (
                <>
                  <Controller
                    control={control}
                    name="zoneType"
                    render={({ field }) => (
                      <CustomComboBox
                        disabled={submitMutation.isPending}
                        enumValues={ZoneTypeEnum}
                        error={
                          (errors as { zoneType?: Record<string, undefined> })
                            .zoneType?.message
                        }
                        label="Zone Type"
                        name="zoneType"
                        onValueChange={field.onChange}
                        required={selectedCategory === "2"}
                        value={field.value}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="locationHub"
                    render={({ field }) => (
                      <CustomComboBox
                        disabled={submitMutation.isPending}
                        enumValues={LocationHubEnum}
                        // error={errors.locationHub?.message}
                        error={
                          (
                            errors as {
                              locationHub?: Record<string, undefined>;
                            }
                          ).locationHub?.message
                        }
                        label="Location Hub"
                        name="locationHub"
                        onValueChange={field.onChange}
                        required={selectedCategory === "2"}
                        value={field.value}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="propertyCondition"
                    render={({ field }) => (
                      <CustomComboBox
                        disabled={submitMutation.isPending}
                        enumValues={PropertyConditionEnum}
                        error={
                          (
                            errors as {
                              propertyCondition?: Record<string, undefined>;
                            }
                          ).propertyCondition?.message
                        }
                        label="Property Condition"
                        name="propertyCondition"
                        onValueChange={field.onChange}
                        required={selectedCategory === "2"}
                        value={field.value}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="customership"
                    render={({ field }) => (
                      <CustomComboBox
                        disabled={submitMutation.isPending}
                        enumValues={CustomerShipEnum}
                        error={
                          (
                            errors as {
                              customership?: Record<string, undefined>;
                            }
                          ).customership?.message
                        }
                        label="Customership"
                        name="customership"
                        onValueChange={field.onChange}
                        required={selectedCategory === "2"}
                        value={field.value}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="totalFloors"
                    render={({ field }) => (
                      <CustomInput
                        label="Total Floors"
                        placeholder="Enter total floors"
                        {...field}
                        disabled={submitMutation.isPending}
                        error={
                          (
                            errors as {
                              totalFloors?: Record<string, undefined>;
                            }
                          ).totalFloors?.message
                        }
                        required={selectedCategory === "2"}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="floorNumber"
                    render={({ field }) => (
                      <CustomInput
                        label="Floor Number"
                        placeholder="Enter floor number"
                        {...field}
                        disabled={submitMutation.isPending}
                        error={
                          (
                            errors as {
                              floorNumber?: Record<string, undefined>;
                            }
                          ).floorNumber?.message
                        }
                        required={selectedCategory === "2"}
                      />
                    )}
                  />
                </>
              )}
            </div>
          </section>
        )}

        {/* Amenities Section */}
        {selectedCategory !== "3" && (
          <section className="clamp-[gap,1.25rem,1rem] clamp-[mb,32px,49px] flex flex-col">
            <h2 className="clamp-[text,1.1875rem,1.25rem] font-semibold text-[#1800AD]">
              Amenities
            </h2>
            <Controller
              control={control}
              name="amenities"
              render={({ field }) => (
                <CustomCheckbox
                  disabled={submitMutation.isPending}
                  error={
                    (
                      errors as {
                        amenities?: Record<string, undefined>;
                      }
                    ).amenities?.message
                  }
                  onValueChange={field.onChange}
                  selectedValues={field.value || []}
                />
              )}
            />
          </section>
        )}

        {/* Images Section */}
        <section className="clamp-[gap,1.25rem,1rem] clamp-[mb,32px,49px] flex flex-col">
          <h2 className="clamp-[text,1.1875rem,1.25rem] font-semibold text-[#1800AD]">
            Upload images
          </h2>

          <Controller
            control={control}
            name="coverImage"
            render={({ field, fieldState }) => {
              const hasFile = field.value;
              const isNewFile = hasFile && field.value instanceof File;
              const isExistingImage =
                hasFile && typeof field.value === "string";
              const isReplacing = isEditMode && isNewFileSelected && isNewFile;
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      className="font-semibold text-[#474777] text-[.875rem]"
                      htmlFor="cover-image"
                    >
                      Cover image*
                    </Label>
                    {isEditMode && field.value && (
                      <p className="text-amber-600 text-xs">
                        Remove existing file by clearing this field
                      </p>
                    )}
                  </div>
                  <FileUpload
                    accept="image/*"
                    disabled={submitMutation.isPending}
                    maxFiles={1}
                    onValueChange={(files) => {
                      if (files && files.length > 0) {
                        field.onChange(files[0]);
                        setIsNewFileSelected(true);
                        toast.success("Image selected successfully");
                      }
                    }}
                    value={isNewFile ? [field.value] : []}
                  >
                    <div className="flex">
                      <FileUploadDropzone className="no-spinner flex flex h-auto w-full items-start justify-start justify-end rounded-r-none rounded-l-[.375rem] border-[#6254B4] border-[1px] border-solid bg-white px-3.75 py-2.5 text-start font-medium text-[.875rem] placeholder-gray-400 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <p className="flex justify-start text-start">
                          {field.value ? field.value.name : "Browse files"}
                        </p>
                      </FileUploadDropzone>

                     <FileUploadTrigger asChild>
                        <Button
                          className={cn(
                            "h-auto cursor-pointer rounded-r-[.375rem]! rounded-l-none border-0 text-white hover:text-white",
                            isReplacing
                              ? ""
                              : "bg-[#6254B4] hover:bg-[#1B1DC8]",
                          )}
                          size="sm"
                          type="button"
                          variant="outline"
                        >
                          {isReplacing ? "REPLACE" : "BROWSE"}
                        </Button>
                      </FileUploadTrigger>
                    </div>
                    <div className="font-medium text-[#81818B] text-[.625rem]">
                      *Max file size: 2 MB
                    </div>
                    <FileUploadListContent className="space-y-2" />
                  </FileUpload>

                  {fieldState.error && (
                    <p className="mt-1 text-[.75rem] text-red-500">
                      * {fieldState.error.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
          <Controller
            control={control}
            name="galleryImages"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label
                  className="font-semibold text-[#474777] text-[.875rem]"
                  htmlFor="gallery-images"
                >
                  Gallery images*
                </Label>
                {isEditMode && field.value && (
                  <p className="text-amber-600 text-xs">
                    New file selected - will replace existing
                  </p>
                )}
                <FileUpload
                  accept="image/*"
                  disabled={submitMutation.isPending}
                  maxFiles={15}
                  multiple={true}
                  onValueChange={field.onChange}
                  value={field.value || []}
                >
                  <FileUploadDropzone className="rounded-lg border-2 border-[#6254B4] border-dashed p-6 transition-colors hover:border-gray-400 data-dragging:border-blue-500 data-dragging:bg-blue-50">
                    <div className="flex items-center gap-[1rem] text-center">
                      <svg
                        className="opacity-40"
                        fill="none"
                        height="27"
                        viewBox="0 0 44 27"
                        width="44"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M34.3801 26.0569H27.2685H25.3535H24.9399V18.2932H28.0597C28.8508 18.2932 29.3183 17.5615 28.8508 17.0346L22.7822 10.2003C22.3956 9.76126 21.5954 9.76126 21.2088 10.2003L15.1402 17.0346C14.6727 17.5615 15.1312 18.2932 15.9313 18.2932H19.0511V26.0569H18.6375H16.7225H8.47814C3.75807 25.8447 0 22.2519 0 18.3591C0 15.6736 1.78913 13.3321 4.44136 12.0662C4.19861 11.532 4.07274 10.9613 4.07274 10.3613C4.07274 7.6173 6.79689 5.40016 10.1684 5.40016C10.8966 5.40016 11.5979 5.5026 12.2542 5.70017C14.2051 2.33421 18.4128 0 23.3036 0C29.633 0.00731729 34.8476 3.95134 35.4409 8.97831C40.3049 9.65882 44 13.3248 44 17.4737C44 21.908 39.7564 25.7495 34.3801 26.0569Z"
                          fill="#6254B4"
                        />
                      </svg>

                      <p className="text-[#81818B] text-[14px]">
                        Drop your files here
                      </p>
                      <p className="text-[#81818B] text-[14px] uppercase">or</p>

                      <FileUploadTrigger asChild>
                        <Button
                          className="cursor-pointer border-[#6254B4] bg-[#6254B417] text-[#6254B4]"
                          size="sm"
                          type="button"
                          variant="outline"
                        >
                          Browse Files
                        </Button>
                      </FileUploadTrigger>
                    </div>
                  </FileUploadDropzone>
                  <div className="font-medium text-[#81818B] text-[.625rem]">
                    *Max file size: 2 MB
                  </div>
                  <FileUploadGalleryContent className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4" />
                </FileUpload>

                {fieldState.error && (
                  <p className="mt-1 text-[.75rem] text-red-500">
                    * {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-end">
                   {!(isEditMode && property?.verificationStatus === 1) && (
 <Button
            className="h-auto cursor-pointer border border-[#1B1DC8] px-8 py-3.5 font-semibold text-[#1B1DC8] text-[17px] hover:bg-[#1B1DC8]/10"
            disabled={submitMutation.isPending}
            onClick={onSaveDraft}
            type="button"
            variant="outline"
          >
            {submitMutation.isPending && submitType === "draft"
              ? "Saving..."
              : "Save as Draft"}
          </Button>)}

          <Button
            className="h-auto cursor-pointer bg-[#1B1DC8] px-12.5 py-3.5 font-semibold text-[17px] text-white hover:bg-[#1B1DC8]/90"
            disabled={submitMutation.isPending}
            type="submit"
          >
            {submitMutation.isPending && submitType === "create"
              ? "Publishing..."
              : "Publish"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PropertyAddForm;
