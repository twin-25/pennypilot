import { api } from "./api"

export const categoryApi = api.injectEndpoints({
  endpoints:(builder) =>({
    getCategories: builder.query({
      query: ()=>'transactions/categories/',
      providesTags: ['Categories'] ,
    }),
    createCategory: builder.mutation({
      query:(categoryData)=>({
        url:'transactions/categories/create/',
        method: 'POST',
        body:categoryData,
      }),
      invalidatesTags:['Categories']
    })
  })
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation
} = categoryApi