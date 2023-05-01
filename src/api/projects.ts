import axios from "axios";
import { configOptions } from "../config/config";
import { ICreateProject } from "../types";
const { apiAddress } = configOptions;

export const projectsIndex = async () => {
  const res = await axios.get(`${apiAddress}/api/projects`);
  return res.data;
};

export const projectsStore = async (
  data: ICreateProject,
  accessToken: string
) => {
  const res = await axios.post(`${apiAddress}/api/projects`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
