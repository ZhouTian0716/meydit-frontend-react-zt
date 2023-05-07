import axios from "axios";
import { configOptions } from "../config/config";
const { apiAddress } = configOptions;

export const s3SecureUrlForUpload = async (
  fileType: string,
  filesFolder: string,
  category: string
) => {
  const res = await axios.get(
    `${apiAddress}/api/aws/s3/upload?fileType=${fileType}&filesFolder=${filesFolder}&category=${category}`
  );
  return res.data;
};

export const s3SecureUrlForDelete = async (fileName: string) => {
  const res = await axios.get(
    `${apiAddress}/api/aws/s3/delete?fileName=${fileName}`
  );
  return res.data;
};
