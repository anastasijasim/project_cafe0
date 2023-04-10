import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axiosInstance from "../../axios";

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params)=>{
    const{data} = await axiosInstance.post ("/auth/login", params);
    return data
})

export const fetchAuthRegister = createAsyncThunk("/auth/fetcAuthRegister", async (params)=>{
    const{data} = await axiosInstance.post ("/auth/register", params);
    return data
});

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async ()=>{
    const{data} = await axiosInstance.get ("/auth/me");
    return data
});


const initialState = {
    data: null,
    status: "loading"
};

const authSlise = createSlice ({
    name:"auth",
    initialState,
    reducers:{
        logout:(state) =>{
            state.data = null;
        }
    },
    extraReducers:{
        [fetchAuth.pending]: (state)=>{
            state.data = null;
            state.status = "loading";
        },
        [fetchAuth.fulfilled]:(state,action) =>{
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]:(state) =>{
            state.data = null;
            state.status = "error";
        },
        [fetchAuthMe.pending]: (state)=>{
            state.data = null;
            state.status = "loading";
        },
        [fetchAuthMe.fulfilled]:(state,action) =>{
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]:(state) =>{
            state.data = null;
            state.status = "error";
        },
        [fetchAuthRegister.pending]: (state)=>{
            state.data = null;
            state.status = "loading";
        },
        [fetchAuthRegister.fulfilled]:(state,action) =>{
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthRegister.rejected]:(state) =>{
            state.data = null;
            state.status = "error";
        },
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const {logout} = authSlise.actions;

export const authReducer = authSlise.reducer;