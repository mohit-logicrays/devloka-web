/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiUrl } from "@/utils/constants";
import { getRequest, postRequest, patchRequest } from "@/utils/axios-request";
import {
  loginSuccess,
  registerSuccess,
  updateUserSuccess,
} from "@/utils/success";
import { LoadingMessage } from "@/utils/loading-messages";
import { loadingToast } from "@/utils/message-utils";

const loginUrl = getApiUrl("LOGIN");
const registerUrl = getApiUrl("REGISTER");
const authUserUrl = getApiUrl("AUTH_USER");

interface AuthContextType {
  auth: any | null;
  getAuthenticatedUser: () => Promise<void>;
  loginUser: (formdata: object) => Promise<void>;
  registerUser: (formdata: object) => Promise<void>;
  updateUserDetails: (userID: number, formdata: object) => Promise<void>;
  getUserDevspaces: () => Promise<void>;
  userDevspaces: any[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let id = null;
  const [auth, setAuth] = useState(null);
  const [userDevspaces, setUserDevspaces] = useState([]);

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
    const response = await getRequest(authUserUrl, "", true, () => {});
    if (response?.status === 200) {
      setAuth(response.data);
    }
  };

  /**
   * Default action to update the user details
   * @param data object
   */
  const updateUserDetails = async (userID: number, formdata: Object) => {
    id = loadingToast(LoadingMessage.UPDATING_USER, null);
    const response = await patchRequest(
      getApiUrl("UPDATE_USER") + userID + "/",
      formdata,
      id,
      true,
      updateUserSuccess
    );
    if (response?.status === 200) getAuthenticatedUser();
  };

  /**
   * Gets the user's codespaces and updates the codespace state.
   * @returns {Promise<void>}
   */
  const getUserDevspaces = async () => {
    const response = await getRequest(
      getApiUrl("USER_DEVSPACES"),
      "",
      true,
      () => {}
    );
    if (response?.status === 200) {
      setUserDevspaces(response?.data?.results);
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
    updateUserDetails,
    getUserDevspaces,
    userDevspaces,
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
