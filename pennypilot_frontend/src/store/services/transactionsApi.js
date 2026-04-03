import { api } from "./api"

export const transactionsApi = api.injectEndpoints({
  endpoints: (builder) =>({
    getTransactions: builder.query({
      query: () => 'transactions/',
      providesTags: ['Transactions'],
    }),
    getTransaction: builder.query({
      query: (id) =>`transactions/${id}/`,
      providesTags: ['Transactions', 'Dashboard'],
    }),
    updateTransaction: builder.mutation({
      query:({id, ...transactionData}) =>({
        url:`transactions/${id}/update/`,
        method: 'PUT',
        body: transactionData      
      }),
      invalidatesTags:['Transactions', 'Dashboard'],
    }),
    deleteTransaction: builder.mutation({
      query:(id) =>({
        url:`transactions/${id}/delete/`,
        method: 'DELETE',   
      }),
      invalidatesTags:['Transactions', 'Dashboard'],
    }),
    createTransaction: builder.mutation({
      query:(transactionData) =>({
        url:'transactions/create/',
        method: 'POST',
        body: transactionData      
      }),
      invalidatesTags:['Transactions', 'Dashboard'],
    }),
  })

})

export const {
  useCreateTransactionMutation,
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi