import { configureStore, combineReducers, getDefaultMiddleware, createStore } from '@reduxjs/toolkit';
import { AnyARecord } from 'dns';
import { createPostSlice } from './createPostReducer';
import { loginSlice } from './loginReducer';
import { notificationSlice } from './notificationReducer';
import { postsSlice } from './postsReducer';
import { profileSlice } from './profileReducer';
import {registrationSlice} from './registrationReducer'

const rootReducer = combineReducers({
  // cartReducer: cartReducer,
  // productReducer: productReducer,
  createPostReducer: createPostSlice.reducer,
  loginReducer: loginSlice.reducer,
  notificationReducer: notificationSlice.reducer,
  postsReducer: postsSlice.reducer,
  profileReducer: profileSlice.reducer,
  registrationReducer: registrationSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;