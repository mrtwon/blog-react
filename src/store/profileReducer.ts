import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/PostItem";
import { login } from "./loginReducer";

export interface InterfaceInitialState{
    currentUser: User | null
    error: string | null
}
let initialState: InterfaceInitialState = {
    currentUser: null,
    error: null
}

export let checkLogin = createAsyncThunk<User>(
    '@@profileReducer/checkLogin',
    async (_,thunkApi) => {
        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch('http://localhost/auth.php?act=checkLogin',{
                credentials: 'include'
              })
            let json = await response.json()
            if(!json.ok) return rejectWithValue(json.error)
            return json.response[0]
        }catch(e){
            return rejectWithValue('error request to server')
        }
    }
)

export let logout = createAsyncThunk<Boolean>(
    '@@profileReducer/logout',
    async (_,thunkApi) => {
        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch('http://localhost/auth.php?act=logout',{
                credentials: 'include'
              })
            let json = await response.json()
            if(!json.ok) return rejectWithValue(json.error)
            return true
        }catch(e){
            return rejectWithValue('error request to server')
        }
    }
)

export const profileSlice = createSlice({
    name: '@@profileReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            state.currentUser = action.payload
            state.error = null
        })
        builder.addCase(checkLogin.rejected, (state, action) => {
            if(action.error.message){
                state.currentUser = null
                state.error = action.payload as string
            }
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
            state.error = null
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null
            state.error = null
        })
    }
})