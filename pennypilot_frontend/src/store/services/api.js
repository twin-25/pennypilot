import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath:'api',
  tagTypes:['Categories', 'Transactions', 'Budgets', 'Users', 'Dashboard', 'Notifications'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders: (header, {getState}) =>{
      const token = getState().auth.token
      if(token){
        header.set('authorization', `Bearer ${token}`)
        header.set('content-type', 'application/json')
      }
      return header
    }
  }),
  endpoints:() =>({})
})