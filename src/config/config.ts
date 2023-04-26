// import axios, { AxiosRequestConfig } from "axios";

// ZT-NOTE: import.meta.env.VITE_LOCAL_BACKEND is a variable that is set in the .env file
export const configOptions = {
  apiAddress: import.meta.env.VITE_CONNECT_AWS_EC2
    ? import.meta.env.VITE_AWS_EC2_BACKEND
    : import.meta.env.VITE_LOCAL_BACKEND,
};

// ZT-NOTE: alphaApi is an axios instance with configured headers
