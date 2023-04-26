import { defineConfig } from "vite";
import dns from 'dns'
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "localhost",
    // proxy: {
    //   "dev": {
    //     target: process.env.VITE_LOCAL_DEV,
    //   },
    //   "prod": {
    //     target: process.env.VITE_AWS_EC2,
    //   }
    // }
  },
});
