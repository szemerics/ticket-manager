import { ICreateMovie } from "../interfaces/ICreateMovie";
import { ICreateOrderByCashier } from "../interfaces/ICreateOrderByCashier";
import { ICreateProfile } from "../interfaces/ICreateProfile";
import { ICreateRoom } from "../interfaces/ICreateRoom";
import { ICreateScreening } from "../interfaces/ICreateScreening";
import { IMovie } from "../interfaces/IMovie";
import { IProfile } from "../interfaces/IProfile";
import { IRoom } from "../interfaces/IRoom";
import { IScreening } from "../interfaces/IScreening";
import { ISetting } from "../interfaces/ISetting";
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
  updateProfile: (obj: ICreateProfile) => axionsInstance.put('/User/UpdateProfile', obj),
  deleteUser: (id: string) => axionsInstance.delete(`/User/DeleteUser/${id}`),
  registerAnonym: (obj: { name: string; email: string; password: string; phone: string }) => axionsInstance.post('/User/RegisterAnonym', obj),
}

const Screenings = {
  getAllScreenings: () => axionsInstance.get<IScreening[]>('/Screening/GetAllScreenings'),
  deleteScreening: (id: string) => axionsInstance.delete(`/Screening/DeleteScreening/${id}`),
  updateScreening: (id: string, obj: ICreateScreening) => axionsInstance.put(`/Screening/UpdateScreening/${id}`, obj),
  createScreening: (obj: ICreateScreening) => axionsInstance.post(`/Screening/CreateScreening`, obj),
  getScreeningsByMovieId: (movieId: string) => axionsInstance.get<IScreening[]>(`/Screening/GetScreeningsByMovieId/${movieId}`)
}

const Orders = {
  getAllOrders: () => axionsInstance.get('/Order/GetAllOrders'),
  getOrderById: (id: string) => axionsInstance.get(`/Order/GetOrderById/${id}`),
  getOrderByUserId: (userId: string) => axionsInstance.get(`/Order/GetOrderByUserId/${userId}`),
  getOrders: () => axionsInstance.get('/Order/GetMyOrders'),
  deleteOrder: (id: string) => axionsInstance.delete(`/Order/DeleteOrder/${id}`),
  createOrder: (order: any) => axionsInstance.post('/Order/CreateOrder', order),
  createOrderByAnonymus: (email: string, phone: string, order: any) => axionsInstance.post(`/Order/CreateOrderByAnonymous?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`, order),
  createOrderByCashier: (obj: ICreateOrderByCashier) => axionsInstance.post(`/Order/CreateOrderByCashier`, obj),
}

const Rooms = {
  getAllRooms: () => axionsInstance.get<IRoom[]>(`/Room/GetAllRooms`),
  getRoomById: (id: string) => axionsInstance.get<IRoom>(`/Room/GetRoomById/${id}`),
  updateRoom: (id: string, obj: ICreateRoom) => axionsInstance.put(`/Room/UpdateRoom/${id}`, obj),
  deleteRoom: (id: string) => axionsInstance.delete(`/Room/DeleteRoom/${id}`),
  createRoom: (obj: ICreateRoom) => axionsInstance.post(`/Room/CreateRoom`, obj)
}

const Settings = {
  getSettings: () => axionsInstance.get<ISetting[]>(`/Admin/GetSettings`)
}

const Auth = {
  login: (email: string, password: string) => axionsInstance.post<{token: string}>('/User/Login', {email,password}),
  forgotPassword: (email: string) => axionsInstance.post('/User/ForgotPassword', {email})
}

const api = {
  Movies,
  Auth,
  Users,
  Screenings,
  Orders,
  Rooms,
  Settings
}

export default api;