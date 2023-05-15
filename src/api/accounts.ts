import axios from "axios";
import { configOptions } from "../config/config";
import { IAccount } from "./resTypes";

const { apiAddress } = configOptions;

export const accountsIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/accounts`);
  const data :IAccount[]  = res.data;
  return data;
};

export const accountShow = async (accountId: string) => {
  const res = await axios.get(`${apiAddress}/api/accounts/${accountId}`);
  return res.data;
};
