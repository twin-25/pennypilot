import { api } from "./api";


export const dashboardApi = api.injectEndpoints({  
  endpoints:(builder) =>({
    getDashboard: builder.query({
      query: ()=>'dashboard/summary/',
      providesTags:['Dashboard']
    })
  }),
});

export const {
  useGetDashboardQuery
} = dashboardApi
