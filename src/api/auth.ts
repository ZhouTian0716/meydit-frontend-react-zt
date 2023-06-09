import axios from "axios";
import { configOptions } from "../config/config";
import { ICreateAccount, ILoginData } from "../types";
import { ILoginRes } from "./resTypes";

const { apiAddress } = configOptions;

export const registerApi = async (data: ICreateAccount) => {
  const res = await axios.post(`${apiAddress}/api/accounts`, data);
  return res.data;
};

export const loginApi = async (data: ILoginData) => {
  const res = await axios.post(`${apiAddress}/api/auth/login`, data);
  const loginResponse: ILoginRes = res.data;
  return loginResponse;
};

export const logoutApi = async (accessToken: string) => {
  const res = await axios.post(`${apiAddress}/api/auth/logout`, null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
