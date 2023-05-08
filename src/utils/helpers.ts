import { toast } from "react-toastify";

export const validateFilesize = (
  filesize: number,
  mbLitmit: number,
  fileName: string
) => {
  if (filesize / 10240 > mbLitmit) {
    toast.error(
      `${mbLitmit}mb per file, ${fileName} size is ${(filesize / 10240).toFixed(
        1
      )}mb`
    );
    return false;
  }
  return true;
};
