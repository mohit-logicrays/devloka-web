/* eslint-disable */
/**
 * Sampatti Default Exception handling
 */
import axios from "axios";
import { type AxiosResponse } from "axios";
import { type Id, toast } from "react-toastify";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  redirectPage,
} from "./utils";
import { getApiUrl, ignoreUrls } from "./constants";
import { axiosRequest } from "./axios-request";
import { errorToast } from "./message-utils";

const REFRESH_URL = getApiUrl("REFRESH");

/**
 * Refresh Token
 * @returns Promise
 */
async function refreshAccessToken(): Promise<boolean> {
  const refresh = getLocalStorage("refresh");
  if (!refresh) {
    redirectPage("/login");
    return false;
  }
  try {
    const response = await axios.post(REFRESH_URL, { refresh });
    if (response.status === 200) {
      setLocalStorage(response.data);
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  removeLocalStorage("access");
  removeLocalStorage("refresh");
  redirectPage("/login");
  return false;
}

/**
 * Default 400 Bad request exception handling
 * @param id Id
 * @param errors any
 */
export const exception400 = (id: Id, errors: any) => {
  let toastUpdate = true;
  Object.entries(errors).forEach(([key, value]) => {
    let element = document.querySelector(`input[name="${key}"]`);
    if (element) {
      if (element.nextElementSibling) {
        element.nextElementSibling.innerHTML = String(value);
      }
      delete errors[key];
    } else {
      if (toastUpdate) {
        toastUpdate = false;
        if (Array.isArray(value)) {
          errorToast(id, value[0]);
        } else {
          errorToast(id, String(value));
        }
      } else {
        if (Array.isArray(value)) {
          toast.error(value[0]);
        } else {
          toast.error(String(value));
        }
      }
    }
    if (toastUpdate) {
      toastUpdate = false;
      errorToast(id, "Please check the form and correct the errors.");
    }
  });
};

/**
 * Default 401 Unauthorized exception handling
 * @param url string
 * @param method string
 * @param data any
 * @param id Id
 * @param config any
 * @param callback ()=>{}
 * @param error any
 */
export const exception401 = async (
  url: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  data: any,
  id: Id,
  add_bearer: boolean,
  callback: (id: Id, response: AxiosResponse) => void,
  error: any
) => {
  if (error?.detail || error?.response?.data?.detail) {
    errorToast(id, error.detail || error.response.data.detail);
  }

  if (ignoreUrls.includes(location.pathname)) {
    return;
  }

  const refreshed = await refreshAccessToken();
  if (refreshed) {
    axiosRequest(url, method, data, id, add_bearer, callback);
  }
};

export const exception403 = (id: Id, errors: any) => {
  console.log(id, errors);
};

export const exception404 = (id: Id, errors: any) => {
  console.log(id, errors);
};

export const exception500 = (id: Id, errors: any) => {
  console.log(id, errors);
};
