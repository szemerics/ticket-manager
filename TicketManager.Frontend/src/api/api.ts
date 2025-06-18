import { ICreateMovie } from "../interfaces/ICreateMovie";
import { IMovie } from "../interfaces/IMovie";
import { IProfile } from "../interfaces/IProfile";
import axionsInstance from "./axios.config";

const Movies = {
  getMovies: () => axionsInstance.get<IMovie[]>('/Movie/GetMovies'),
  getCategories: () => axionsInstance.get<{id: number, name: string}[]>('/Movie/GetCategories'),
  createMovie: (obj: ICreateMovie) => axionsInstance.post('/Movie/CreateMovie', obj),
  getMovieById: (id: string) => axionsInstance.get<IMovie>(`/Movie/GetMovieById/${id}`),
  updateMovie: (id: string, obj: ICreateMovie) => axionsInstance.put(`/Movie/UpdateMovie/${id}`, obj),
  deleteMovie: (id: string) => axionsInstance.delete(`/Movie/DeleteMovie/${id}`)
}

const Users = {
  getProfile: () => axionsInstance.get<IProfile>('/User/GetProfile'),
  getAllUsers: () => axionsInstance.get<IProfile[]>('/User/GetAllUsers'),
  getUserById: (id: string) => axionsInstance.get<IProfile>(`/User/GetUserById/${id}`),
  updateProfile: (obj: IProfile) => axionsInstance.put('/User/UpdateProfile', obj),
  deleteUser: (id: string) => axionsInstance.delete(`/User/DeleteUser/${id}`),

}

const Orders = {
  getAllOrders: () => axionsInstance.get('/Order/GetAllOrders'),
  getOrderById: (id: string) => axionsInstance.get(`/Order/GetOrderById/${id}`),
  getOrderByUserId: (userId: string) => axionsInstance.get(`/Order/GetOrderByUserId/${userId}`),
  getOrders: () => axionsInstance.get('/Order/GetMyOrders'),
  deleteOrder: (id: string) => axionsInstance.delete(`/Order/DeleteOrder/${id}`),
}

const Auth = {
  login: (email: string, password: string) => axionsInstance.post<{token: string}>('/User/Login', {email,password}),
  forgotPassword: (email: string) => axionsInstance.post('/User/ForgotPassword', {email})
}

const api = {
  Movies,
  Auth,
  Users,
  Orders
}

export default api;