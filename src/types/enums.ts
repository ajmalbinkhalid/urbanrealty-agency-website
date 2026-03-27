import type {
  CustomerShipEnum,
  FurnishingEnum,
  LocationHubEnum,
  PossessionStatusEnum,
  PropertyCategoryEnum,
  PropertyConditionEnum,
  PropertyPurposeEnum,
  ZoneTypeEnum,
} from "@/utils/enum";

export type TPropertyCategoryEnum =
  (typeof PropertyCategoryEnum)[keyof typeof PropertyCategoryEnum];

export type TPropertyPurposeEnum =
  (typeof PropertyPurposeEnum)[keyof typeof PropertyPurposeEnum];

export type TFurnishingEnum =
  (typeof FurnishingEnum)[keyof typeof FurnishingEnum];

export type TPossessionStatusEnum =
  (typeof PossessionStatusEnum)[keyof typeof PossessionStatusEnum];

export type TCustomerShipEnum =
  (typeof CustomerShipEnum)[keyof typeof CustomerShipEnum];

export type TPropertyConditionEnum =
  (typeof PropertyConditionEnum)[keyof typeof PropertyConditionEnum];

export type TZoneEnum = (typeof ZoneTypeEnum)[keyof typeof ZoneTypeEnum];

export type TLocationEnum =
  (typeof LocationHubEnum)[keyof typeof LocationHubEnum];
