import axios from "axios";
import config from "../config/config";
import { ICreateAccount, ILoginData } from "../types";

export function registerApi(data: ICreateAccount) {
  return axios.post(`${config.apiAddress}/api/accounts`, data);
}

export function loginApi(data: ILoginData) {
  return axios.post(`${config.apiAddress}/api/auth/login`, data);
}

export function logoutApi(accessToken: string) {
  return axios.post(`${config.apiAddress}/api/auth/logout`, accessToken);
}
