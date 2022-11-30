import { createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CartProduct } from "../types/CartProduct";
import { Product } from "../types/Product";
import {Post, Like, User, PostItem, PostContent} from '../types/PostItem'
import { match } from "assert";

interface InterfaceInitialState {
    status: 'load' | 'error' | 'complete' | null,
    error: string | null,
    postList: PostItem[] | null
}
const initialState: InterfaceInitialState = {
    error: null,
    postList: null,
    status: null
}

export const loadPosts = createAsyncThunk<PostItem[]>(
    '@@postsReducer/loadPost',
    async (_,thunkApi) => {
        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch('http://localhost/getPost.php',{
                credentials: 'include'
              })
            let json = await response.json()
            if(!json.ok) return rejectWithValue(json.error)
            return json.response
        }catch(e){
            return rejectWithValue('error request to server')    
        }
    }
)
export const updatePost = createAsyncThunk<PostItem, Post>(
    '@@postReducer/updatePost',
    async (post: Post, thunkApi) => {
        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch('http://localhost/updatePost.php', {
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(post),
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
export const createPost = createAsyncThunk<PostItem, PostContent>(
    '@@postReducer/createPost',
    async (post: PostContent, thunkApi) => {
        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch('http://localhost/createPost.php',{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(post),
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
export const removePost = createAsyncThunk<Post['id'], Post['id']>(
    '@@postReducer/removePost',
    async (postId: Post['id'], thunkApi) => {
        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch(`http://localhost/deletePost.php?postId=${postId}`,{
                credentials: 'include'
            })
            let json = await response.json()
            if(!json.ok) return rejectWithValue(json.error)
            return postId
        }catch(e){
            return rejectWithValue('error request to server')
        }
    }
)

export const likePost = createAsyncThunk<Like, Post>(
    '@@postReducer/likePost',
    async (post: Post, thunkApi) => {

        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch(`http://localhost/like.php?act=add&postId=${post.id}`,{
                credentials: 'include'
            })
            let json = await response.json()
            if(!json.ok) return rejectWithValue(json.error)
            return json.response[0] as Like
        }catch(e){
            return rejectWithValue('error request to server')
        }
    }
)

export const unLikePost = createAsyncThunk<Like, Post>(
    '@@postReducer/unLikePost',
    async (post: Post, thunkApi) => {
        let {rejectWithValue} = thunkApi
        try{
            let response = await fetch(`http://localhost/like.php?act=remove&postId=${post.id}`,{
                credentials: 'include'
            })
            let json = await response.json()
            if(!json.ok) return rejectWithValue(json.message.error)
            return json.response[0] as Like
        }catch(e){
            return rejectWithValue('error request to server')
        }
    }
)


export const postsSlice = createSlice({
        name: '@@cartReducer',
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            builder.addCase(loadPosts.fulfilled, (state, action) => {
                state.postList = action.payload
            })
            builder.addCase(loadPosts.rejected, (state, action) => {
                if(action.payload){
                    state.error = action.payload as string
                }
            })
            builder.addCase(createPost.fulfilled, (state, action) => {
                let oldPostList = state.postList ? state.postList : []
                state.postList = [action.payload, ...oldPostList]
            })
            builder.addCase(removePost.fulfilled, (state, action) => {
                if(state.postList){
                    state.postList = state.postList.filter(item => item.post.id !== action.payload)
                }
            })
            builder.addCase(updatePost.fulfilled, (state, action) => {
                if(state.postList){
                    state.postList = state.postList.map(item => {
                        if(item.post.id === action.payload.post.id){
                            return action.payload
                        }
                        return item
                    })
                }
            })
            builder.addCase(likePost.fulfilled, (state, action) => {
                if(state.postList){
                    state.postList = state.postList.map(item => {
                        if(item.post.id === action.payload.postId){
                            item.likes.push(action.payload)
                            return item
                        }
                        return item
                    })
                }
            })
            builder.addCase(unLikePost.fulfilled, (state, action) => {
                if(state.postList){
                    state.postList = state.postList.map(item => {
                        if(item.post.id === action.payload.postId){
                            item.likes = item.likes.filter(item2 => item2.postId !== action.payload.postId)
                            return item
                        }
                        return item
                    })
                }
            })


            builder.addMatcher((action) => action.type.endsWith('/pending'), (state, action) => {
                state.status = 'load'
            })
            builder.addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
                state.status = 'error'
            })
            builder.addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
                state.status = 'complete'
                state.error = null
            })
        }
    }
)
// const cartReducer = cartSlice.reducer
// const {addToCart, plusProduct, minusProduct, removeProduct} = cartSlice.actions
// export {cartReducer, addToCart, plusProduct, minusProduct, removeProduct}