import axios from "axios";

// Axios instance for the entire application

const BASE_URL = "/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
