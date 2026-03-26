import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  tagTypes:['Dashboard'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/dashboard/',
    prepareHeaders: (headers, {getState}) =>{
      const token = getState().auth.token
      if(token){
        headers.set('Authorization', `Bearer ${token}`)
        headers.set('content-type', 'application/json')
      }
      return headers
    }
  }),
  
  endpoints:(builder) =>({
    getDashboard: builder.query({
      query: ()=>'summary/',
      providesTags:['Dashboard']
    })
  }),
});

export const {
  useGetDashboardQuery
} = dashboardApi
