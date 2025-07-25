/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiUrl } from "@/utils/constants";
import { getRequest, postRequest } from "@/utils/axios-request";
import { loginSuccess, registerSuccess } from "@/utils/success";
import { LoadingMessage } from "@/utils/loading-messages";
import { loadingToast } from "@/utils/message-utils";
import { useUtilsContext } from "@/providers/utils-providers";

const loginUrl = getApiUrl("LOGIN");
const registerUrl = getApiUrl("REGISTER");
const authUserUrl = getApiUrl("AUTH_USER");

interface AuthContextType {
  auth: any | null;
  getAuthenticatedUser: () => Promise<void>;
  loginUser: (formdata: object) => Promise<void>;
  registerUser: (formdata: object) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let id = null;
  const [auth, setAuth] = useState(null);
  const { updatePreloader } = useUtilsContext();

  /**
   * Default login form handling action
   * @param formdata object
   */
  const loginUser = async (formdata: object) => {
    id = loadingToast(LoadingMessage.LOGIN, null);
    await postRequest(loginUrl, formdata, id, false, loginSuccess);
  };

  /**
   * Default register form handling action
   * @param formdata object
   */
  const registerUser = async (formdata: object) => {
    id = loadingToast(LoadingMessage.REGISTER, null);
    await postRequest(registerUrl, formdata, id, false, registerSuccess);
  };

  /**
   * Default authenticated user action
   */
  const getAuthenticatedUser = async () => {
    const response = await getRequest(authUserUrl, null, true, () => {});
    if (response?.status === 200) {
      setAuth(response.data);
      updatePreloader();
    }
  };

  useEffect(() => {
    getAuthenticatedUser();
  }, []);
  const data = {
    auth,
    getAuthenticatedUser,
    loginUser,
    registerUser,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
