import axios from "axios";
import { configOptions } from "../config/config";
import { IProject, IProjectData } from "./resTypes";
import { ICreateProject, IUpdateProject } from "./payloadTypes";

const { apiAddress } = configOptions;

export const projectsIndex = async (perPage: string | number = 20, page: string | number = 1) => {
  const res = await axios.get(`${apiAddress}/api/projects?perPage=${perPage}&page=${page}`);
  return res.data;
};

export const projectShow = async (slug: string) => {
  const res = await axios.get(`${apiAddress}/api/projects/${slug}`);
  const resData: IProjectData = res.data;
  return resData;
};

export const projectsByAccount = async (accountId: string) => {
  const res = await axios.get(`${apiAddress}/api/accounts/${accountId}/projects`);
  return res.data;
};

export const projectsStore = async (data: ICreateProject, accessToken: string) => {
  const res = await axios.post(`${apiAddress}/api/projects`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const projectUpdate = async (projectSlug: string, data: IUpdateProject, accessToken: string) => {
  const res = await axios.put(`${apiAddress}/api/projects/${projectSlug}`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const updated: IProject = res.data;
  return updated;
};
