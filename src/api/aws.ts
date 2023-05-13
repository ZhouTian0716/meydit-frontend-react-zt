import axios from "axios";
import { configOptions } from "../config/config";
const { apiAddress } = configOptions;

export const s3SecureUrlForUpload = async (
  fileType: string,
  filesFolder: string,
  category: string,
  accountId: string,
  accessToken: string
) => {
  const res = await axios.get(
    `${apiAddress}/api/aws/s3/upload?fileType=${fileType}&filesFolder=${filesFolder}&category=${category}&accountId=${accountId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const s3SecureUrlForDelete = async (
  fileName: string,
  accountId: string,
  accessToken: string
) => {
  const res = await axios.get(
    `${apiAddress}/api/aws/s3/delete?fileName=${fileName}&accountId=${accountId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};
