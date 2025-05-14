import { IMovie } from "../interfaces/IMovie";
import axionsInstance from "./axios.config";

const Movies = {
  getMoives: () => axionsInstance.get<IMovie>('/Movie/GetMovies')
}

const Auth = {
  login: (email: string, password: string) => axionsInstance.post<{token: string}>('/User/Login', {email,password}),
  forgotPassword: (email: string) => axionsInstance.post('/User/ForgotPassword', {email})
}

const api = {
  Movies,
  Auth
}

export default api;