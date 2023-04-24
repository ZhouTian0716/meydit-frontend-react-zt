// import axios, { AxiosRequestConfig } from "axios";

// ZT-NOTE: import.meta.env.VITE_LOCAL_BACKEND is a variable that is set in the .env file
export const configOptions = {
  apiAddress:
    import.meta.env.VITE_FRONTEND_MODE === "local"
      ? "http://localhost:3333"
      : "https://mydeployedbackend.com",
};

// ZT-NOTE: alphaApi is an axios instance with configured headers



