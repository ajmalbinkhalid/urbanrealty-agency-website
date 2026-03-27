import type { PromiseApiResponse } from "@/types/api-response";
import type { PhoneValue } from "@/types/custom-types";
import axiosClient from "./config/axios-config";

export const frontendApi = {
  resubmitApplication: async (data: {
    firstName: string;
    lastName: string;
    phone: PhoneValue;
    cRNumber: string;
    company: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await axiosClient.post("/resubmit-application", data);
    return response.data;
  },
  getLocations: async (): PromiseApiResponse<{
    locations: {
      _id: string;
      name: string;
    }[];
  }> => {
    const response = await axiosClient.get("/locations");
    return response.data;
  },

  getAmenities: async (): PromiseApiResponse<{
    amenities: {
      _id: string;
      name: string;
      icon: string;
    }[];
  }> => {
    const response = await axiosClient.get("/amenities");
    return response.data;
  },

  getSubCategories: async ({
    categoryId,
  }: {
    categoryId: string;
  }): PromiseApiResponse<{
    subCategories: {
      _id: string;
      name: string;
    }[];
  }> => {
    const response = await axiosClient.get(
      `/sub-categories?categoryId=${categoryId}`
    );
    return response.data;
  },
};
