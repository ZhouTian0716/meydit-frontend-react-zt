import axios from "axios";
import { configOptions } from "../config/config";

import { ICreateImage, IUpdateImage } from "./payloadTypes";
import { IImage } from "./resTypes";
const { apiAddress } = configOptions;

export const imagesIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/images`);
  return res.data;
};

export const imagesStore = async (data: ICreateImage) => {
  const res = await axios.post(`${apiAddress}/api/images`, data);
  const resData : IImage = res.data
  return resData;
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

export const imageDelete = async (
  imageId: string,
  accessToken: string
) => {
  const res = await axios.delete(
    `${apiAddress}/api/images/${imageId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res;
};