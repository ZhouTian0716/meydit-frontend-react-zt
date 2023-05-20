import axios from "axios";
import { configOptions } from "../config/config";
import { ICreateImage } from "../types";
import { IUpdateImage } from "./payloadTypes";
const { apiAddress } = configOptions;

export const imagesIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/images`);
  return res.data;
};

export const imagesStore = async (data: ICreateImage) => {
  const res = await axios.post(`${apiAddress}/api/images`, data);
  return res.data;
};

export const imageUpdate = async (
  imageId: string,
  payload: IUpdateImage,
  accessToken: string
) => {
  const res = await axios.put(
    `${apiAddress}/api/images/${imageId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};