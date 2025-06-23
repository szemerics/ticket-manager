import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Home from "../pages/Home.tsx";
import Movie from "../pages/Movie.tsx";
import Profile from "../pages/Profile.tsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.tsx";
import AdminMovies from "../pages/Admin/AdminMovies.tsx";
import AdminUsers from "../pages/Admin/AdminUsers.tsx";
import AdminScreenings from "../pages/Admin/AdminScreenings.tsx";
import AdminRooms from "../pages/Admin/AdminRooms.tsx";
import AdminOrders from "../pages/Admin/AdminOrders.tsx";
import Booking from "../pages/Booking.tsx";

export const routes = [
    {
        path: "login",
        component: <Login/>,
        isPrivate: false
    },
    {
        path: "register",
        component: <Register/>,
        isPrivate: false
    },
    {
        path: "home",
      _component: <Home />,
        get component() {
          return this._component;
        },
        set component(value) {
          this._component = value;
        },
        isPrivate: false
    },
    {
      path : "profile",
      component: <Profile/>,
      isPrivate: true
    },
    {
      path: "movies/:id",
      component: <Movie />,
      isPrivate: false
    },
        {
      path : "admin/dashboard",
      component: <AdminDashboard/>,
      isPrivate: true
    },
    {
      path : "admin/movies",
      component: <AdminMovies/>,
      isPrivate: true
    },
    {
      path : "admin/users",
      component : <AdminUsers/>,
      isPrivate: true
    },
    {
      path : "admin/screenings",
      component: <AdminScreenings/>,
      isPrivate: true
    },
    {
      path : "admin/rooms",
      component: <AdminRooms/>,
      isPrivate: true
    },
    {
      path : "admin/orders",
      component: <AdminOrders/>,
      isPrivate: true
    },
    {
      path: "booking/:movieId",
      component: <Booking />,
      isPrivate: false
    },
]