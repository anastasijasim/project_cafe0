import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axiosInstance from "../../axios";

export const fetchPosts = createAsyncThunk ('posts/fetchPosts', async () => {
    const {data} = await axiosInstance.get ('/posts');
    return data
})

export const fetchRemovePost = createAsyncThunk ('posts/fetchRemovePost', async (id) =>  
   axiosInstance.delete (`/posts/${id}`)
)

const initialState = {
    posts: {
        items: [],
        status: "loading",
    }
};

const postsSlise = createSlice({
    name:"posts",
    initialState,
    reducers:{},
    extraReducers:{
        [fetchPosts.pending]: (state)=>{
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPosts.fulfilled]:(state,action) =>{
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]:(state) =>{
            state.posts.status = 'error';
            state.posts.items = [];
        },
        [fetchRemovePost.pending]: (state, action)=>{
            state.posts.items = state.posts.item.filter((obj) => obj._id ===action.meta.arg)
        },
       
    }
})

export const postsReducer = postsSlise.reducer;

