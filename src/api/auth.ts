import axios from "axios";
import { configOptions } from "../config/config";
import { ICreateAccount, ILoginData } from "../types";

const { apiAddress } = configOptions;

export const registerApi = async (data: ICreateAccount) => {
  const res = await axios.post(`${apiAddress}/api/accounts`, data);
  return res.data;
};

export const loginApi = (data: ILoginData) => {
  return axios.post(`${apiAddress}/api/auth/login`, data);
};

export const logoutApi = (accessToken: string) => {
  return axios.post(`${apiAddress}/api/auth/logout`, null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
