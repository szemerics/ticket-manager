import { ICreateMovie } from "../interfaces/ICreateMovie";
import { IMovie } from "../interfaces/IMovie";
import { IProfile } from "../interfaces/IProfile";
import Profile from "../pages/Profile";
import axionsInstance from "./axios.config";

const Movies = {
  getMovies: () => axionsInstance.get<IMovie[]>('/Movie/GetMovies'),
  getCategories: () => axionsInstance.get<{id: number, name: string}[]>('/Movie/GetCategories'),
  createMovie: (obj: ICreateMovie) => axionsInstance.post('/Movie/CreateMovie', obj),
  getMovieById: (id: string) => axionsInstance.get<IMovie>(`/Movie/GetMovieById/${id}`),
  updateMovie: (id: string, obj: ICreateMovie) => axionsInstance.put(`/Movie/UpdateMovie/${id}`, obj),
  deleteMovie: (id: string) => axionsInstance.delete(`/Movie/DeleteMovie/${id}`)
}

const Profiles = {
  getProfile: () => axionsInstance.get<IProfile>('/User/GetProfile')
}

const Orders = {
  getOrders: () => axionsInstance.get('/Order/GetMyOrders')
}


const Auth = {
  login: (email: string, password: string) => axionsInstance.post<{token: string}>('/User/Login', {email,password}),
  forgotPassword: (email: string) => axionsInstance.post('/User/ForgotPassword', {email})
}

const api = {
  Movies,
  Auth,
  Profiles,
  Orders
}

export default api;