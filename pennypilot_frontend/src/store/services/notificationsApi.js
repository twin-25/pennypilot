import { api } from "./api";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) =>({
    getNotifications: builder.query({
      query:()=>'notifications/',
      providesTags:['Notifications']
    }),
    markAsRead: builder.mutation ({
      query:(id) => ({
        url: `notifications/${id}/mark-as-read/`,
        method: 'PUT',
      }),
      invalidatesTags:['Notifications']
    }),
    deleteNotification: builder.mutation({
      query: (id) =>({
        url: `notifications/${id}/delete/`,
        method: 'DELETE'
      }),
      invalidatesTags:['Notifications']
    })

  })
})

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi
