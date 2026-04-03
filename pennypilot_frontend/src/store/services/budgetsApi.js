import { api } from "./api"

export const budgetsApi = api.injectEndpoints({
  endpoints: (builder) =>({
    getBudgets: builder.query({
      query: ({month, year}) => `budgets/?month=${month}&year=${year}`,
      providesTags: ['Budgets'],
    }),
    updateBudget: builder.mutation({
      query:({id, ...budgetData}) =>({
        url:`budgets/${id}/update/`,
        method: 'PUT',
        body: budgetData      
      }),
      invalidatesTags:['Budgets'],
    }),
    deleteBudget: builder.mutation({
      query:(id) =>({
        url:`budgets/${id}/delete/`,
        method: 'DELETE',   
      }),
      invalidatesTags:['Budgets'],
    }),
    createBudget: builder.mutation({
      query:(budgetData) =>({
        url:'budgets/create/',
        method: 'POST',
        body: budgetData      
      }),
      invalidatesTags:['Budgets'],
    }),
  })

})

export const {
  useCreateBudgetMutation,
  useGetBudgetsQuery,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetsApi