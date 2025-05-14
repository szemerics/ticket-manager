import axios from "axios";
import { tokenKeyName } from "../constants/constants";

const baseURL = `${import.meta.env.VITE_REST_API_URL}/api`

const axionsInstance = axios.create( {
  baseURL
})

axionsInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(tokenKeyName)}`;
  return config;
})

export default axionsInstance;0