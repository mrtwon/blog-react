import { createSlice } from "@reduxjs/toolkit"
import { create } from "domain"
import { createPost } from "./postsReducer"

export interface InterfaceInitialState{
    ok: boolean | null
    error: string | null
    uid: string | null
}
const initialState: InterfaceInitialState = {
    ok: null,
    error: null,
    uid: null
}
export const createPostSlice = createSlice({
    name: '@@createPost',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.ok = true
            state.error = null
        })
        builder.addCase(createPost.rejected, (state, action) => {
            if(action.payload){
                state.error = action.payload as string
                state.ok = false
            }
        })
        builder.addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
            state.uid = Math.random().toString(16).slice(2)
        })
        builder.addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
            state.uid = Math.random().toString(16).slice(2)
        })
    }
}
)