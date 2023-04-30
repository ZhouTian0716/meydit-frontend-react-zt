import { toast } from "react-toastify";

export const validateFilesize = (filesize: number, mbLitmit: number) => {
  if (filesize / 10240 > mbLitmit) {
    toast.error(`File size no more than ${mbLitmit}mb`)
    return false;
  }
  return true;
};
