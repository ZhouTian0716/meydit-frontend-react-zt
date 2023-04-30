import axios from "axios";
import { configOptions } from "../config/config";
const { apiAddress } = configOptions;

export const s3SecureUrl = async (fileType:string) => {
  const res = await axios.get(`${apiAddress}/api/aws/s3?fileType=${fileType}`);
  return res.data;
};



