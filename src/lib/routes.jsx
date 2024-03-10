import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard  from "../components/dashboard/index"; 
import Layout from "../components/layout/index";
import Comments from "../components/comments/index";
import Profile from "../components/profile/index"


export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";

export const USERS = PROTECTED + "/users";
export const PROFILE = PROTECTED + "/profile/:id";
export const COMMENTS = PROTECTED + "/comments/:id";

export const router = createBrowserRouter([
    {
        path: ROOT,
        element: "hello world"
    },
    {
        path: LOGIN,
        element: <Login />
    },
    {
        path: REGISTER,
        element: <Register />
    },
    {
        path: PROTECTED,
        element: <Layout />,
        children: [
            {
                path: DASHBOARD,
                element: <Dashboard />
            },
            {
                path: USERS,
                element: "<Users />"
            },
            {
                path: PROFILE,
                element: <Profile />
            },
            {
                path: COMMENTS,
                element: <Comments />
            } 
        ]
    }
]);
