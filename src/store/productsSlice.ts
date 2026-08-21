import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductCardData } from '../types/product'

interface ProductsState {
  likedIds: string[]
  deletedIds: string[]
  customProducts: ProductCardData[]
  filter: 'all' | 'liked'
}

const initialState: ProductsState = {
  likedIds: [],
  deletedIds: [],
  customProducts: [],
  filter: 'all',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const id = action.payload
      if (state.likedIds.includes(id)) {
        state.likedIds = state.likedIds.filter((i) => i !== id)
      } else {
        state.likedIds.push(id)
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.deletedIds.push(action.payload)
    },
    addCustomProduct: (state, action: PayloadAction<ProductCardData>) => {
      state.customProducts.push(action.payload)
    },
    setFilter: (state, action: PayloadAction<'all' | 'liked'>) => {
      state.filter = action.payload
    },
  },
})

export const { toggleLike, deleteProduct, addCustomProduct, setFilter } =
  productsSlice.actions
export default productsSlice.reducer
