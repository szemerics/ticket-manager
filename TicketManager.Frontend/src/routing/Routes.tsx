import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Movie from "../pages/Movie.tsx";
import Profile from "../pages/Profile.tsx";
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
        path: "dashboard",
        component: <Dashboard/>,
        isPrivate: false
    },
    {
      path : "profile",
      component: <Profile/>,
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