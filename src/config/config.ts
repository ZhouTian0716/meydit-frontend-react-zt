// import axios, { AxiosRequestConfig } from "axios";
export const configOptions = {
  apiAddress: import.meta.env.VITE_LOCAL_DEV || import.meta.env.VITE_AWS_EC2,
};

// ZT-NOTE: alphaApi is an axios instance with configured headers
