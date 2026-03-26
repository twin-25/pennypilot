import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from '@reduxjs/toolkit/query';
import { userApi } from "./services/UserApi";
import authReducer from './slices/authSlice'
import { dashboardApi } from "./services/dashboardApi";

export const store = configureStore({
  reducer:{
    auth: authReducer,
    [userApi.reducerPath] :userApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,

  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(dashboardApi.middleware)
});

setupListeners(store.dispatch);