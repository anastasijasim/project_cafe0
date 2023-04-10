import AddPost from "../page/AddPost/AddPost";
import FullPost from "../page/FullPost/FullPost";
import Home from "../page/Home/Home"
import Login from "../page/Login/Login";
import MainLayout from "../layout/MainLayout"
import Register from "../page/Register/Register";

export const HOME_PATH = '/';
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const FULLPOST_PATH = '/posts/:id';
export const ADDPOST_PATH = "/add-posts";
export const EDITPOST_PATH = "/posts/:id/edit"



export const mainLayoutRoutes ={
    Layout: MainLayout,
    routes:[
        {path:HOME_PATH, Component: Home},
        {path:LOGIN_PATH, Component: Login},
        {path:REGISTER_PATH, Component: Register},
        {path:FULLPOST_PATH, Component: FullPost},
        {path:ADDPOST_PATH, Component: AddPost},
        {path:EDITPOST_PATH, Component:AddPost},
    ]
}