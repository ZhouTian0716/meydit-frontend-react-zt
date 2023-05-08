import { toast } from "react-toastify";

export const validateFilesize = (
  filesize: number,
  mbLitmit: number,
  fileName: string
) => {
  if (filesize / 1048576 > mbLitmit) {
    toast.error(
      `${mbLitmit}mb per file, ${fileName} size is ${(filesize / 1048576).toFixed(
        1
      )}mb`
    );
    return false;
  }
  return true;
};
