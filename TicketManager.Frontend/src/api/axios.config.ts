import axios from "axios";

const baseURL = `${import.meta.env.VITE_REST_API_URL}/api`

const axionsInstance = axios.create( {
  baseURL
})

export default axionsInstance;0