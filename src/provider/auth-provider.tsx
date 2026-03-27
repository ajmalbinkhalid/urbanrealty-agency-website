"use client";
import { type ReactNode, useEffect, useState } from "react";
import { authApi } from "@/api/auth-api";
import type { PhoneValue } from "@/types/custom-types";
import {
  AuthContext,
  type TAgencyData,
  type TAgencyTeamData,
  type TempAgencyData,
} from "../contexts/auth-context";
import {
  clearAuthData,
  getToken,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from "../utils/auth-storage";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [tempData, setTempDataState] = useState<TempAgencyData | null>(null);
  const [user, setUserState] = useState<{
    agency: TAgencyData;
    agencyTeam: TAgencyTeamData;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = getToken();
        if (!token) {
          return;
        }
        const result = await authApi.getProfile();

        setTokenState(token);
        setUserState({
          agency: result.data.agency,
          agencyTeam: result.data.agencyTeam,
        });
      } catch {
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const saveToken = (newToken: string) => {
    setTokenState(newToken);
    setToken(newToken);
  };

  const saveUser = (newUser: {
    agency: TAgencyData;
    agencyTeam: TAgencyTeamData;
  }) => {
    setUserState(newUser);
    setUser(newUser);
  };

  const login = async ({
    email,
    phone,
    loginType,
  }: {
    email?: string;
    phone?: PhoneValue;
    loginType: "email" | "phone";
  }): Promise<{ success: boolean; message: string }> => {
    const response = await authApi.sendOtp({
      loginType,
      email,
      phone,
    });

    setTempDataState({
      identifier: response.data.identifier,
      tempToken: response.data.sessionToken,
      tempType: "login",
    });

    return {
      success: true,
      message: response.message,
    };
  };

  const verifyOTP = async (
    otp: string
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    const currentTempToken = tempData?.tempToken;

    if (!currentTempToken) {
      return {
        success: false,
        message: "No active session. Please request OTP again.",
      };
    }

    const response = await authApi.verifyOtp({
      token: currentTempToken,
      otp,
    });

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    if (
      response.data.accessToken &&
      response.data.agency &&
      response.data.agencyTeam
    ) {
      saveUser({
        agency: response.data.agency,
        agencyTeam: response.data.agencyTeam,
      });
      saveToken(response.data.accessToken);
      setTempDataState(null);

      return {
        success: true,
        message: response.message,
      };
    }

    if (response.data.agency) {
      return {
        success: true,
        message: response.message,
      };
    }

    return {
      success: false,
      message: response.message,
    };
  };

  const resendOTP = async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const currentTempToken = tempData?.tempToken;

    if (!currentTempToken) {
      return {
        success: false,
        message: "No active session. Please request OTP again.",
      };
    }

    const response = await authApi.resendOtp(currentTempToken);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    return {
      success: true,
      message: response.message,
    };
  };

  const registerUser = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: PhoneValue;
    cRNumber: string;
    company: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await authApi.register(data);

    setTempDataState({
      tempToken: response.data.sessionToken,
      identifier: response.data.identifier,
      registerCred: data,
      tempType: "register",
    });

    return {
      success: true,
      message: response.message,
    };
  };

  const logout = () => {
    setUserState(null);
    setTokenState(null);
    removeToken();
    removeUser();
  };

  const getProfile = async (): Promise<{
    success: boolean;
    message: string;
    agency: TAgencyData;
    agencyTeam: TAgencyTeamData;
  }> => {
    const response = await authApi.getProfile();

    saveUser({
      agency: response.data.agency,
      agencyTeam: response.data.agencyTeam,
    });

    return {
      success: true,
      message: response.message,
      agency: response.data.agency,
      agencyTeam: response.data.agencyTeam,
    };
  };

  const updateProfile = async (data: {
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
  }): Promise<{
    success: boolean;
    message: string;
    agency: TAgencyData;
    agencyTeam: TAgencyTeamData;
  }> => {
    const response = await authApi.updateProfile(data);

    saveUser({
      agency: response.data.agency,
      agencyTeam: response.data.agencyTeam,
    });
    return {
      success: true,
      message: response.message,
      agency: response.data.agency,
      agencyTeam: response.data.agencyTeam,
    };
  };

  const getTokenValue = () => token;

  const value = {
    user,
    token,
    tempData,
    isLoggedIn: !!token && !!user,
    isLoading,
    login,
    verifyOTP,
    registerUser,
    resendOTP,
    logout,
    getProfile,
    updateProfile,
    getToken: getTokenValue,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
