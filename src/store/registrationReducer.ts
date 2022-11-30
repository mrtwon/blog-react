import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { act } from "react-dom/test-utils"
import { json } from "stream/consumers"
import { PostItem, User, PostContent, UserContent } from "../types/PostItem"
import { ServerResponse } from "../types/ServerResponse"

export interface InterfaceInitialState{
    ok: boolean | null
    error: string | null
}

let initialState: InterfaceInitialState = {
    ok: null,
    error: null
}



export const registration = createAsyncThunk<Boolean, {password:string}&UserContent>(
    '@@registrationReducer/sendRegistrationData',
    async (input: {password:string}&UserContent, thunkApi) => {
        let {rejectWithValue} = thunkApi
        let {login, name, password} = input 
        try{
            let response = await fetch(`http://localhost/registration.php?login=${login}&name=${name}&password=${password}`,{
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

export const registrationSlice = createSlice({
    name: '@@registrationReducer',
    initialState,
    reducers: {
        clearRegistration(state){
            state.ok = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registration.fulfilled, (state, action) => {
            state.ok = true
            state.error = null
        })
        builder.addCase(registration.rejected, (state, action) => {
            if(action.payload){
                state.ok = false
                state.error = action.payload as string
            }
        })
    }
})

export const {clearRegistration} = registrationSlice.actions
