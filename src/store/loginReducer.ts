import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../types/PostItem"

export interface InterfaceInitialState{
    ok: boolean | null,
    error: string | null
}

let initialState: InterfaceInitialState = {
    ok: null,
    error: null
}

interface TypeResponse<T>{
    ok: boolean,
    error: string,
    response: T[]
}
export let login = createAsyncThunk<User, {login: string, password: string}>(
    '@@loginReducer/login',
    async (data: {login:string,password:string},thunkApi) => {
        let {rejectWithValue} = thunkApi
        let {login,password} = data
        try{
            let response = await fetch(`http://localhost/auth.php?act=login&login=${login}&password=${password}`,{
                credentials: 'include'
              })
            let json = await response.json()
            console.log(json)
            if(!json.ok){
                console.log("if - "+json.error)
                return rejectWithValue(json.error)
            }
            console.log(json.response[0])
            return json.response[0]
        }catch(e){
            console.log(e)
            return rejectWithValue('error request to server')
        }
    }
)

export const loginSlice = createSlice({
    name: '@@loginReducer',
    initialState,
    reducers: {
        clearLogin(state){
            state.ok = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.ok = true
            state.error = null
        })
        builder.addCase(login.rejected, (state, action) => {
            if(action.payload){
                state.error = action.payload as string
                state.ok = false
            }
        })
    }
})

export const {clearLogin} = loginSlice.actions