import { toast } from "react-toastify";
import { IAddress } from "../api/resTypes";

export const validateFilesize = (
  filesize: number,
  mbLitmit: number,
  fileName: string
) => {
  if (filesize / 1048576 > mbLitmit) {
    toast.error(
      `${mbLitmit}mb per file, ${fileName} size is ${(
        filesize / 1048576
      ).toFixed(1)}mb`
    );
    return false;
  }
  return true;
};

export const isObjectEmpty = (obj: any) => {
  for (let key in obj) {
    if (obj[key] !== "") {
      return false;
    }
  }
  return true;
};

// Adapting to user address changes:
export const getPrimaryAddress = (addresses: IAddress[]) => {
  let primaryAddress: string;
  if (addresses) {
    const targetIndex = addresses.findIndex(
      (address) => address.isPrimary === true
    );
    // console.log(targetIndex);
    if (targetIndex === -1) {
      return (primaryAddress = `${addresses[0].city}, ${addresses[0].zip}, ${addresses[0].state}, ${addresses[0].country}`);
    }
    const targetAddress = addresses[targetIndex];
    primaryAddress = `${targetAddress.city}, ${targetAddress.zip}, ${targetAddress.state}, ${targetAddress.country}`;
    return primaryAddress;
  } else {
    primaryAddress = "Address pending.";
    return primaryAddress;
  }
};
