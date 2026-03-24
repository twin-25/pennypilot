import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes:['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/users/'
  }),
  endpoints:(builder) =>({
    createUser: builder.mutation({
      query:(formData) =>({
        url:'register/',
        method:"POST",
        body: formData
      }),
      invalidatesTags:['User'],
    }),
    loginUser: builder.mutation({
      query:(credentials) =>({
        url:'login/',
        method:"POST",
        body:credentials
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
} = userApi
