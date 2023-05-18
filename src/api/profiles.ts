import axios from "axios";
import { configOptions } from "../config/config";
import { IUpdateProfile } from "./payloadTypes";

const { apiAddress } = configOptions;

export const profileUpdate = async (
  profileId: number,
  data: IUpdateProfile,
  accessToken: string
) => {
  const res = await axios.put(
    `${apiAddress}/api/profiles/${profileId}`,
    data,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const profileShow = async (accountId:string) => {
  const res = await axios.get(`${apiAddress}/api/profiles/${accountId}`);
  return res.data;
};
