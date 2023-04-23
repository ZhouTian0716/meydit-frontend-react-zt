import axios from "axios";
import config from "../../config/config";

export function createAccount(data: { email: string; password: string }) {
  return axios.post(`${config.apiAddress}/api/accounts`, data);
}
