import axios from "axios";
import { configOptions } from "../config/config";
import { ICreateProject } from "../types";
import { IProject } from "./resTypes";
const { apiAddress } = configOptions;

export const projectsIndex = async (
  perPage: string | number = 20,
  page: string | number = 1
) => {
  const res = await axios.get(
    `${apiAddress}/api/projects?perPage=${perPage}&page=${page}`
  );
  return res.data;
};

export const projectShow = async (slug: string) => {
  const res = await axios.get(`${apiAddress}/api/projects/${slug}`);
  const resData: IProject = res.data;
  return resData;
};

export const projectsByAccount = async (accountId: string) => {
  const res = await axios.get(
    `${apiAddress}/api/accounts/${accountId}/projects`
  );
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
