import axios from "axios";
import { configOptions } from "../config/config";
const { apiAddress } = configOptions;

export const s3SecureUrl = async () => {
  const res = await axios.get(`${apiAddress}/api/aws/s3`);
  return res.data;
};



