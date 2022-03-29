import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/products/productSlice'
import commentReducer from '../features/comments/commentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    comments: commentReducer
  },
});
