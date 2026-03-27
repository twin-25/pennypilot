import { api } from "./api";


export const userApi = api.injectEndpoints({
  endpoints:(builder) =>({
    createUser: builder.mutation({
      query:(formData) =>({
        url:'users/register/',
        method:"POST",
        body: formData
      }),
      invalidatesTags:['User'],
    }),
    loginUser: builder.mutation({
      query:(credentials) =>({
        url:'users/login/',
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
