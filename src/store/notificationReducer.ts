import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ok } from "assert"
import { login } from "./loginReducer"
import { createPost, likePost, removePost, unLikePost, updatePost } from "./postsReducer"
import { logout } from "./profileReducer"
import { registration } from "./registrationReducer"

export interface InterfaceInitialState{
    ok: boolean | null
    message: string | null
    uid: string | null
}

let initialState: InterfaceInitialState = {
    ok: null,
    message: null,
    uid: null
}


export let notificationSlice = createSlice({ 
    name: '@@notificationReducer',
    initialState,
    reducers: {
        test(state){
            state.ok = true
            state.message = 'test message'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'Post updated'
        })
        builder.addCase(updatePost.rejected, (state, action) => {
            if(action.payload){
                state.message = action.payload as string
                state.ok = false
            }
        })
        builder.addCase(removePost.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'Post deleted'
        })
        builder.addCase(removePost.rejected, (state, action) => {
            if(action.payload){
                state.message = action.payload as string
                state.ok = false
            }
        })
        builder.addCase(likePost.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'Liked'
        })
        builder.addCase(likePost.rejected, (state, action) => {
            if(action.payload){
                state.message = action.payload as string
                state.ok = false
            }
        })
        builder.addCase(unLikePost.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'Like deleted'
        })
        builder.addCase(unLikePost.rejected, (state, action) => {
            if(action.payload){
                state.message = action.payload as string
                state.ok = false
            }
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'You logout'
        })
        builder.addCase(logout.rejected, (state, action) => {
            if(action.payload){
                state.message = action.payload as string
                state.ok = false
            }
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'You login'
        })
        builder.addCase(registration.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'You have successfully registered'
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.ok = true
            state.message = 'your post has been successfully added'
        })
        builder.addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
            state.uid = Math.random().toString(16).slice(2)
        })
        builder.addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
            state.uid = Math.random().toString(16).slice(2)
        })
    }
})

export const {test} = notificationSlice.actions