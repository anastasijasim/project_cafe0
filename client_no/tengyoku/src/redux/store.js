import { authReducer } from "./slices/auth";
import {configureStore} from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";

const store = configureStore ({
    reducer:{
        posts:postsReducer,
        auth:authReducer
    }
})

export default store;