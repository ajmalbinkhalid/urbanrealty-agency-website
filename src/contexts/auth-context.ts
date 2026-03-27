"use client";
import { createContext } from "react";
import type { PhoneValue } from "@/types/custom-types";

export type TAgencyData = {
  id: string;
  agencyId: number;
  activeRentPropertiesCount: number;
  activeSalePropertiesCount: number;
  companyName: string;
  cRNumber: string;
  companyLogo: string | null;
  companyEmail: string;
  companyPhone: PhoneValue;
  companyWhatsapp: PhoneValue;
  about?: {
    en: string;
    ar: string;
  };
  isFeatured: boolean;
  verificationStatus: number;
  verificationRejectMessage: string;
  locationId: string;
  status: number;
  createdAt: string;
  updatedAt?: string;
};

export type TAgencyTeamData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: PhoneValue;
  role: string;
  status: number;
  createdAt: string;
  updatedAt?: string;
};

export type TempAgencyData = {
  identifier: string;
  registerCred?: {
    firstName: string;
    lastName: string;
    email: string;
    // phone: PhoneValue;
  };
  tempToken: string;
  tempType: "register" | "login";
};

export type AuthContextType = {
  user: {
    agency: TAgencyData;
    agencyTeam: TAgencyTeamData;
  } | null;
  token: string | null;
  tempData: TempAgencyData | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  login: (data: {
    email?: string;
    phone?: PhoneValue;
    loginType: "email" | "phone";
  }) => Promise<{ success: boolean; message: string }>;

  verifyOTP: (otp: string) => Promise<{
    success: boolean;
    message: string;
  }>;

  resendOTP: () => Promise<{
    success: boolean;
    message: string;
  }>;

  registerUser: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: PhoneValue;
    cRNumber: string;
    company: string;
  }) => Promise<{
    success: boolean;
    message: string;
  }>;

  logout: () => void;
  updateProfile: (data: {
    firstName: string;
    lastName: string;
    companyLogo?: File;
    about?: {
      en: string;
      ar: string;
    };
    companyWhatsApp?: PhoneValue;
    companyEmail: string;
    company: string;
    companyPhone: PhoneValue;
    crNumber: string;
  }) => Promise<{
    success: boolean;
    message: string;
    agency: TAgencyData;
    agencyTeam: TAgencyTeamData;
  }>;
  getProfile: () => Promise<{
    success: boolean;
    message: string;
    agency: TAgencyData;
    agencyTeam: TAgencyTeamData;
  }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
