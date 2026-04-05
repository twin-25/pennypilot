import { api } from "./api"

export const aiApi = api.injectEndpoints({
  endpoints: (builder) =>({
    getTips: builder.mutation({
      query: () =>({
        url:'ai/tips/',
        method:'POST',
      } )
      
    }),
    getAnalysis: builder.mutation({
      query: () =>({
        url:'ai/analysis/',
        method:'POST',
      } )
      
    }),
    getReport: builder.mutation({
      query: () =>({
        url:'ai/report/',
        method:'POST',
      } )
      
    }),
    
  })

})

export const {
 useGetTipsMutation,
 useGetAnalysisMutation,
 useGetReportMutation
} = aiApi