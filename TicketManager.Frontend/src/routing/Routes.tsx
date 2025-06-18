import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Home from "../pages/Home.tsx";
import Movie from "../pages/Movie.tsx";
import Profile from "../pages/Profile.tsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.tsx";
import AdminMovies from "../pages/Admin/AdminMovies.tsx";
import AdminScreenings from "../pages/Admin/AdminScreenings.tsx";
export const routes = [
    {
        path: "login",
        component: <Login/>,
        isPrivate: false
    },
    {
        path: "forgot",
        component: <ForgotPassword/>,
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
      path : "admin/screenings",
      component: <AdminScreenings/>,
      isPrivate: true
    }
]