import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Home from "../pages/Home.tsx";
import Movie from "../pages/Movie.tsx";
import Profile from "../pages/Profile.tsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.tsx";
import AdminMovies from "../pages/Admin/AdminMovies.tsx";
import { Component } from "react";
import AdminUsers from "../pages/Admin/AdminUsers.tsx";
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
    // {
    //   path: "movies",
    //   component: <Movies/>,
    //   isPrivate: true
    // },
    // {
    //   path: "movies/create",
    //   component: <MovieForm isCreate={true}/>,
    //   isPrivate: true
    // },
    {
      path: "movies/:id",
      component: <Movie />,
      isPrivate: false
    }

]