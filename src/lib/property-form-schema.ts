import { z } from "zod";
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

/* ---------------- Helpers ---------------- */

const enumString = <T extends Record<string, number>>(enumObj: T) =>
  z.string().refine((val) => Object.values(enumObj).includes(Number(val)), {
    message: "Required",
  });

const numberString = (name: string) => z.string().min(1, `${name} is required`);

/* ---------------- Image Validation ---------------- */

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const coverImageSchema = z
  .any()
  .refine((file) => file instanceof File, {
    message: "Cover image is required",
  })
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: "Cover image must be less than or equal to 2 MB",
  });

const galleryImageSchema = z
  .array(z.any())
  .min(1, { message: "At least one gallery image is required" })
  .max(15, { message: "Maximum 15 gallery images allowed" })
  .refine((files) => files.every((file) => file instanceof File), {
    message: "All gallery images must be valid files",
  })
  .refine(
    (files) => files.every((file) => !file || file.size <= MAX_FILE_SIZE),
    {
      message: "Each gallery image must be less than or equal to 2 MB",
    }
  );

/* ---------------- Base ---------------- */

const BasePropertySchema = z.object({
  purpose: enumString(PropertyPurposeEnum),
  category: enumString(PropertyCategoryEnum),

  title: z.object({
    en: z.string().min(1, "English title required"),
    ar: z.string().min(1, "Arabic title required"),
  }),

  description: z.object({
    en: z.string().min(1, "English description required"),
    ar: z.string().min(1, "Arabic description required"),
  }),

  landmark: z.object({
    en: z.string().min(1, "English landmark required"),
    ar: z.string().min(1, "Arabic landmark required"),
  }),

  locationId: z.string().min(1, "Location required"),

  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),

  address: z.string().min(1, "Address is required"),

  possessionStatus: enumString(PossessionStatusEnum),

  availableFrom: z.string().optional(),

  area: numberString("Area"),
  price: numberString("Price"),

  /* ✅ REQUIRED IMAGES */
  coverImage: coverImageSchema,
  galleryImages: galleryImageSchema,
});

/* ---------------- Residential ---------------- */

const ResidentialSchema = BasePropertySchema.extend({
  category: z.literal(String(PropertyCategoryEnum.Residential)),

  propertyTypeId: z.string().min(1, "Property type required"),

  bedrooms: numberString("Bedrooms"),
  bathrooms: numberString("Bathrooms"),

  propertyAge: z.coerce.number().min(1, "Property year required"),

  furnishing: enumString(FurnishingEnum),
  amenities: z.array(z.string()).min(2, "Select at least 2 amenities"),
});

/* ---------------- Commercial ---------------- */

const CommercialSchema = BasePropertySchema.extend({
  category: z.literal(String(PropertyCategoryEnum.Commercial)),

  propertyTypeId: z.string().min(1, "Property type required"),

  totalFloors: numberString("Total Floors"),
  floorNumber: numberString("Floor Number"),

  // propertyAge: z.string().min(1, "Property year required"),
  propertyAge: z.coerce.number().min(1, "Property year required"),

  customership: enumString(CustomerShipEnum),
  propertyCondition: enumString(PropertyConditionEnum),
  zoneType: enumString(ZoneTypeEnum),
  locationHub: enumString(LocationHubEnum),
  furnishing: enumString(FurnishingEnum),
  amenities: z.array(z.string()).min(2, "Select at least 2 amenities"),
});

/* ---------------- Land ---------------- */

const LandSchema = BasePropertySchema.extend({
  category: z.literal(String(PropertyCategoryEnum.Land)),
  propertyTypeId: z.string().optional(),
});

/* ---------------- Final Union ---------------- */

export const PropertyFormSchema = z.discriminatedUnion("category", [
  ResidentialSchema,
  CommercialSchema,
  LandSchema,
]);

export type PropertyFormData = z.infer<typeof PropertyFormSchema>;
