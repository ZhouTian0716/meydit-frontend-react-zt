import axios from "axios";
import { configOptions } from "../config/config";
import { ICreateAddress, IUpdateAddress } from "./payloadTypes";
import { IAddress } from "./resTypes";

const { apiAddress } = configOptions;

export const addressUpdate = async (
  addressId: string,
  payload: IUpdateAddress,
  accessToken: string
) => {
  const res = await axios.put(
    `${apiAddress}/api/addresses/${addressId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const addressStore = async (
  payload: ICreateAddress,
  accessToken: string
) => {
  const res = await axios.post(`${apiAddress}/api/addresses`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const resData: IAddress = res.data;
  return resData;
};

export const addressDestroy = async (
  addressId: string,
  accessToken: string
) => {
  const res = await axios.delete(`${apiAddress}/api/addresses/${addressId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const statusCode: number = res.status;
  return statusCode;
};
