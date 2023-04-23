import axios, { AxiosRequestConfig } from "axios";

// ZT-NOTE: import.meta.env.VITE_LOCAL_BACKEND is a variable that is set in the .env file
export default {
  apiAddress:
    import.meta.env.VITE_FRONTEND_ENV === "local"
      ? "http://localhost:3333"
      : "https://mydeployedbackend.com",
};
