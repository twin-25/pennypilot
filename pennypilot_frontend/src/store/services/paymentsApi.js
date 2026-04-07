import { api } from "./api"

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) =>({
    createCheckout: builder.mutation({
      query: () =>({
        url:'payments/create-checkout/',
        method:'POST',
      } )
      
    }),
    
  })

})

export const {
 useCreateCheckoutMutation,
} = paymentsApi