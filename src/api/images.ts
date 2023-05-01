import axios from "axios";
import { configOptions } from "../config/config";
import { ICreateImage } from "../types";
const { apiAddress } = configOptions;

export const imagesIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/images`);
  return res.data;
};

export const imagesStore = async (data: ICreateImage) => {
  const res = await axios.post(`${apiAddress}/api/images`, data);
  return res.data;
};