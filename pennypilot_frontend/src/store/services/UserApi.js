import { api } from "./api"

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => ({
        url: 'users/register/',
        method: 'POST',
        body: formData
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'users/login/',
        method: 'POST',
        body: credentials
      }),
    }),
    getProfile: builder.query({
      query: () => 'users/profile/',
      providesTags: ['User']
    }),
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: 'users/profile/update/',
        method: 'PUT',
        body: profileData
      }),
      invalidatesTags: ['User']
    })
  }),
})

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useUpdateUserProfileMutation,
} = userApi