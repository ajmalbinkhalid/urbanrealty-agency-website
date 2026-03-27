import CryptoJS from "crypto-js";
import type { TAgencyData, TAgencyTeamData } from "@/contexts/auth-context";

const SECRET_KEY = "urban-auth-secret-key-2025";
const TOKEN_KEY = "urban_auth_token";
const AGENCY_KEY = "urban_agency";

/**
 * Encrypts a string using AES encryption
 */
export const encrypt = (text: string): string =>
  CryptoJS.AES.encrypt(text, SECRET_KEY).toString();

/**
 * Decrypts an AES encrypted string
 */
export const decrypt = (text: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
};

/**
 * Gets the decrypted token from localStorage
 */
export const getToken = (): string | null => {
  try {
    const encryptedToken = localStorage.getItem(TOKEN_KEY);
    if (encryptedToken) {
      return decrypt(encryptedToken);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Sets the token in localStorage (encrypted)
 */
export const setToken = (token: string): void => {
  try {
    const encryptedToken = encrypt(token);
    localStorage.setItem(TOKEN_KEY, encryptedToken);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Removes the token from localStorage
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Gets the decrypted agency data from localStorage
 */
export const getUser = (): {
  agency: TAgencyData;
  agencyTeam: TAgencyTeamData;
} | null => {
  try {
    const encryptedUser = localStorage.getItem(AGENCY_KEY);
    if (encryptedUser) {
      const decryptedUser = decrypt(encryptedUser);
      return JSON.parse(decryptedUser);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Sets the agency data in localStorage (encrypted)
 */
export const setUser = (user: {
  agency: TAgencyData;
  agencyTeam: TAgencyTeamData;
}): void => {
  try {
    const encryptedUser = encrypt(JSON.stringify(user));
    localStorage.setItem(AGENCY_KEY, encryptedUser);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Removes the agency data from localStorage
 */
export const removeUser = (): void => {
  try {
    localStorage.removeItem(AGENCY_KEY);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Clears all auth data from localStorage
 */
export const clearAuthData = (): void => {
  removeToken();
  removeUser();
};
