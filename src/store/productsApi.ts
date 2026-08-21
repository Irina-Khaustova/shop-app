import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ApiProduct[], void>({
      query: () => 'products',
    }),
    getProductById: builder.query<ApiProduct, string>({
      query: (id) => `products/${id}`,
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi