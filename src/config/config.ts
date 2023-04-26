// import axios, { AxiosRequestConfig } from "axios";
const backendEC2 = import.meta.env.VITE_AWS_EC2_BACKEND;
const backendLocal = import.meta.env.VITE_LOCAL_BACKEND;

export const configOptions = {
  apiAddress: backendLocal || backendEC2,
};

// ZT-NOTE: alphaApi is an axios instance with configured headers
