import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;
    if (Array.isArray(err?.data.errors)) {
      err?.data.errors.forEach((e: any) => {
        toast.warning(e?.description);
      });
    } else if (typeof err?.data.errors === "object") {
      for (const e in err?.data.errors) {
        toast.warning(err?.data.errors[e][0]);
      }
    } else if (err?.data) {
      toast.warning(err?.data);
    } else if (err?.status === 401) {
      toast.warning("Unauthorized");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.warning(err?.data);
    }
  }
};
