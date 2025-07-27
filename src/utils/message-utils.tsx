/**
 * Sampatti toast message utils
 */
import { toast, type Id, type TypeOptions } from "react-toastify";
import { redirectPageLazy } from "./utils";

const UpdateToast = (id: Id, message: string, typee: string) => {
  toast.update(id, {
    render: message,
    type: typee as TypeOptions,
    isLoading: false,
    autoClose: 7000,
    draggable: true,
    closeButton: true,
  });
};

export const loadingToast = (message: string, options: any) => {
  return toast.loading(message, options);
};

export const errorToast = (id: Id, message: string) => {
  UpdateToast(id, message, "error");
};

export const successToast = (id: Id, message: string, successUrl: string | null) => {
  UpdateToast(id, message, "success");
  if (successUrl) {
    redirectPageLazy(successUrl);
  }
};