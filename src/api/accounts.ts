import axios from "axios";
import { configOptions } from "../config/config";
const { apiAddress } = configOptions;

export const accountsIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/accounts`);
  return res.data;
};

export const accountShow = async (accountId:string) => {
  const res = await axios.get(`${apiAddress}/api/accounts/${accountId}`);
  return res.data;
};

