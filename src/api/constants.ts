import axios from "axios";
import { configOptions } from "../config/config";
const { apiAddress } = configOptions;

export const categoriesIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/categories`);
  return res.data;
};

export const tagsIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/tags`);
  return res.data;
};

export const rolesIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/roles`);
  return res.data;
};
