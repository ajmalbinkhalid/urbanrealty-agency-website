import type { TAgencyData, TAgencyTeamData } from "@/contexts/auth-context";
import type { PhoneValue } from "@/types/custom-types";
import axiosClient from "./config/axios-config";

export const authApi = {
  sendOtp: async ({
    loginType,
    email,
    phone,
  }: {
    loginType: "email" | "phone";
    email?: string;
    phone?: PhoneValue;
  }): Promise<{
    success: boolean;
    message: string;
    data: {
      sessionToken: string;
      expiresAt: string;
      identifier: string;
    };
  }> => {
    const payload = loginType === "email" ? { email } : { phone };

    const response = await axiosClient.post("/auth/request-otp", payload);

    return response.data;
  },

  resendOtp: async (
    token: string
  ): Promise<{
    success: boolean;
    message: string;
    data: {
      sessionToken: string;
      identifier: string;
      expiresAt: string;
    };
  }> => {
    const response = await axiosClient.post(
      "/auth/resend-otp",
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  verifyOtp: async ({
    otp,
    token,
  }: {
    otp: string;
    token: string;
  }): Promise<{
    success: boolean;
    message: string;
    data: {
      accessToken?: string;
      agency?: TAgencyData;
      agencyTeam?: TAgencyTeamData;
    };
  }> => {
    const response = await axiosClient.post(
      "/auth/verify-otp",
      { otp },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  register: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: PhoneValue;
  }): Promise<{
    success: boolean;
    message: string;
    data: {
      sessionToken: string;
      identifier: string;
      expiresAt: string;
    };
  }> => {
    const response = await axiosClient.post("/auth/register", data);
    return response.data;
  },

  getProfile: async (): Promise<{
    success: boolean;
    message: string;
    data: {
      agency: TAgencyData;
      agencyTeam: TAgencyTeamData;
    };
  }> => {
    const response = await axiosClient.get("/auth/get-profile");
    return response.data;
  },

  updateProfile: async (data: {
    firstName: string;
    lastName: string;
    companyLogo?: File;
    about?: {
      en: string;
      ar: string;
    };
    companyWhatsapp?: PhoneValue;
    company: string;
    crNumber: string;
    companyEmail: string;
    companyPhone: PhoneValue;
  }): Promise<{
    success: boolean;
    message: string;
    data: {
      agency: TAgencyData;
      agencyTeam: TAgencyTeamData;
    };
  }> => {
    const formData = new FormData();
    formData.append("firstName", data.firstName || "");
    formData.append("lastName", data.lastName || "");

    formData.append("companyEmail", data.companyEmail);

    formData.append("companyName", data.company);
    formData.append("cRNumber", data.crNumber);

    if (data.companyLogo) {
      formData.append("companyLogo", data.companyLogo);
    }

    if (data.companyWhatsapp?.phoneCode && data.companyWhatsapp.phoneNumber) {
      formData.append(
        "companyWhatsapp.phoneCode",
        data.companyWhatsapp.phoneCode
      );
      formData.append(
        "companyWhatsapp.phoneNumber",
        data.companyWhatsapp.phoneNumber
      );
    }

    if (data.about) {
      formData.append("about.en", data.about.en);
      formData.append("about.ar", data.about.ar);
    }

    formData.append("companyPhone.phoneCode", data.companyPhone.phoneCode);
    formData.append("companyPhone.phoneNumber", data.companyPhone.phoneNumber);

    const response = await axiosClient.put("/auth/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },


};
