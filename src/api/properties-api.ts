import type { PromiseApiResponse } from "@/types/api-response";
import axiosClient from "./config/axios-config";
import { PackageTypeEnum } from "./enum";

export const propertiesApi = {
  createProperty: async (
    propertyData: PropertyFormData
  ): PromiseApiResponse<{
    property: { _id: string };
  }> => {
    const formData = getPropertyFormData(propertyData);

    const response = await axiosClient.post("/properties/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  /* ---------- SAVE DRAFT ---------- */
  saveDraft: async (
    propertyData: PropertyFormData
  ): PromiseApiResponse<{
    property: { _id: string };
  }> => {
    const formData = getPropertyFormData(propertyData);

    //IMPORTANT
    formData.append("formSubmissionType", "draft");

    const response = await axiosClient.post("/properties/draft", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
  getAllProperties: async ({
    purpose,
    search,
    verificationStatus,
    category,
    location,
    sort,
  }: {
    purpose: string;
    search: string;
    verificationStatus: string;
    category: string;
    location: string;
    sort: string;
  }): PromiseApiResponse<{
    currentPage: number;
    nextPage: number | null;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    properties: {
      items: {
        _id: string;
        purpose: number;
        propertyId: string;
        propertyCategoryId: number;
        propertyInformation: {
          locationId: string;
          location: {
            longitude: number;
            latitude: number;
          };
          propertySubCategoryId: string;
          price: string;
          title: string;
          landmark: string;
          locationName: string;
          propertySubCategoryName: string;
        };
        verificationStatus: number;
        isFeatured: boolean;
        status: number;
        createdAt: string;
        coverImage: string;
      }[];
    };
  }> => {
    const response = await axiosClient.get(
      `/properties?purpose=${purpose}&q=${search}&verificationStatus=${verificationStatus}&category=${category}&locationId=${location}&sort=${sort}`
    );
    return response.data;
  },
    getAllPackages: async (
    type?: (typeof PackageTypeEnum)[keyof typeof PackageTypeEnum],
    ): Promise<{
  _id: string;
  subscriptionId: string;
subscriptionType:number
  name: string

  offerText: string;

  price: number;
  flatPrice: number;

  noOfProperties: number;
  noOfFeaturedProperty: number;

  validity: number; 

  status: number;   
  type: number;    
  userType: number; 

  createdAt: string;

  createdBy: {
    actorId: string;
    actorType: number;
  };
}[]> => {
    const params = type ? { type } : {};
    const response = await axiosClient.get(`/packages`, { params });
    return response.data.data;
  },

  getPropertyDetails: async (
    propertyId: string
  ): PromiseApiResponse<{
    property: {
      _id: string;
      purpose: number;
      propertyCategoryId: number;
      propertyInformation: {
        title: string;
        titleObject: {
          en: string;
          ar: string;
        };
        description: string;
        descriptionObject: {
          en: string;
          ar: string;
        };
        landmark: string;
        landmarkObject: {
          en: string;
          ar: string;
        };
        locationId: string;
        locationName: string;
        area: number;
        price: string;
        possessionStatus: number;
        availableFrom: string | null;
        propertySubCategoryId: string;
        propertySubCategoryName: string;
        location: {
          type: string;
          coordinates: [number, number];
        };
        address?: string;
      };
      keyFeatures: {
        zoneType: number;
        locationHub: number;
        propertyCondition: number;
        floorNumber: number;
        customership: number;
        totalFloors: number;
        noOfBedroom: number;
        customerShip?: number;
        totalFloor: number;
        noOfBathroom: number;
        propertyAge: number;
        furnishing: number;
      };
      amenitiesId: string[];
      amenities: {
        _id: string;
        name: string;
        icon: string;
      }[];
      coverImage: string;
      galleryImages: string[];
      verificationStatus: number;
      status: number;
      isFeatured: boolean;
      createdAt: string;
    };
  }> => {
    const response = await axiosClient.get(`/properties/${propertyId}`);
    return response.data;
  },

  updateProperty: async (
    propertyId: string,
    propertyData: PropertyFormData
  ): PromiseApiResponse<{
    property: {
      _id: string;
    };
  }> => {
    const formData = getPropertyFormData(propertyData);
    const response = await axiosClient.patch(
      `/properties/${propertyId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteProperty: async (
    propertyId: string
  ): PromiseApiResponse<{
    message: string;
  }> => {
    const response = await axiosClient.delete(`/properties/${propertyId}`);
    return response.data;
  },

  toggleStatus: async (
    propertyId: string
  ): PromiseApiResponse<{
    status: number;
  }> => {
    const response = await axiosClient.patch(
      `/properties/${propertyId}/toggle-status`
    );
    return response.data;
  },

  toggleFeatured: async (
    propertyId: string
  ): PromiseApiResponse<{
    property: {
      _id: string;
      isFeatured: boolean;
    };
  }> => {
    const response = await axiosClient.patch(
      `/properties/${propertyId}/toggle-featured`
    );
    return response.data;
  },
};

const getPropertyFormData = (propertyData: PropertyFormData): FormData => {
  const formData = new FormData();

  formData.append("purpose", String(propertyData.purpose));

  formData.append("isDraft", propertyData.isDraft ? "1" : "0");

  formData.append("propertyCategoryId", propertyData.category.toString());

  formData.append("propertyInformation.title.en", propertyData.title.en);

  formData.append("propertyInformation.title.ar", propertyData.title.ar);

  formData.append(
    "propertyInformation.description.en",
    propertyData.description.en
  );

  formData.append(
    "propertyInformation.description.ar",
    propertyData.description.ar
  );

  formData.append("propertyInformation.landmark.en", propertyData.landmark.en);

  formData.append("propertyInformation.landmark.ar", propertyData.landmark.ar);

  formData.append("propertyInformation.locationId", propertyData.locationId);

  formData.append(
    "propertyInformation.location.latitude",
    propertyData.location.latitude.toString()
  );

  formData.append(
    "propertyInformation.location.longitude",
    propertyData.location.longitude.toString()
  );

  if (propertyData.address) {
    formData.append("propertyInformation.address", propertyData.address);
  }

  if (propertyData.propertyTypeId) {
    formData.append(
      "propertyInformation.propertySubCategoryId",
      propertyData.propertyTypeId
    );
  }

  formData.append(
    "propertyInformation.possessionStatus",
    propertyData.possessionStatus.toString()
  );

  if (propertyData.availableFrom) {
    formData.append(
      "propertyInformation.availableFrom",
      propertyData.availableFrom.toString()
    );
  }

  if (propertyData.area) {
    formData.append("propertyInformation.area", propertyData.area);
  }

  if (propertyData.price) {
    formData.append("propertyInformation.price", propertyData.price);
  }

  if (propertyData.propertyAge !== undefined) {
    formData.append(
      "keyFeatures.propertyAge",
      propertyData.propertyAge.toString()
    );
  }

  if (propertyData.furnishing !== undefined) {
    formData.append(
      "keyFeatures.furnishing",
      propertyData.furnishing.toString()
    );
  }

  if (propertyData.bedrooms) {
    formData.append("keyFeatures.noOfBedroom", propertyData.bedrooms);
  }

  if (propertyData.bathrooms) {
    formData.append("keyFeatures.noOfBathroom", propertyData.bathrooms);
  }

  if (propertyData.zoneType !== undefined) {
    formData.append("keyFeatures.zoneType", propertyData.zoneType.toString());
  }

  if (propertyData.locationHub !== undefined) {
    formData.append(
      "keyFeatures.locationHub",
      propertyData.locationHub.toString()
    );
  }

  if (propertyData.propertyCondition !== undefined) {
    formData.append(
      "keyFeatures.propertyCondition",
      propertyData.propertyCondition.toString()
    );
  }

  if (propertyData.customership !== undefined) {
    formData.append(
      "keyFeatures.customerShip",
      propertyData.customership.toString()
    );
  }

  if (propertyData.totalFloors) {
    formData.append("keyFeatures.totalFloor", propertyData.totalFloors);
  }

  if (propertyData.floorNumber) {
    formData.append("keyFeatures.floorNumber", propertyData.floorNumber);
  }

  if (propertyData.amenities) {
    for (const amenityId of propertyData.amenities) {
      formData.append("amenities", amenityId);
    }
  }

  if (propertyData.coverImage) {
    formData.append("coverImage", propertyData.coverImage);
  }

  if (propertyData.galleryImages) {
    for (const imageFile of propertyData.galleryImages) {
      formData.append("galleryImages[]", imageFile);
    }
  }

  if (propertyData.galleryImagePaths) {
    for (const filePath of propertyData.galleryImagePaths) {
      formData.append("galleryImagePaths", filePath);
    }
  }
  return formData;
};

type PropertyFormData = {
  isDraft?: boolean;
  purpose: string;
  category: string;
  address?: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  landmark: {
    en: string;
    ar: string;
  };
  locationId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  propertyTypeId?: string;
  possessionStatus: string;
  availableFrom?: string | Date;
  area?: string;
  price?: string;
  propertyAge?: number;
  furnishing?: string;
  bedrooms?: string;
  bathrooms?: string;
  zoneType?: string;
  locationHub?: string;
  propertyCondition?: string;
  customership?: string;
  totalFloors?: string;
  floorNumber?: string;
  amenities?: string[];
  coverImage?: File;
  galleryImages?: File[];
  galleryImagePaths?: string[];
};
