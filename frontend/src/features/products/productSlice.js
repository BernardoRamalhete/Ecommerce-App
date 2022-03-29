import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.createProduct(productData, token)  
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getProducts = createAsyncThunk('products/getAll', async (_ , thunkAPI) => {
    try {
        const response = await productService.getProducts() 
        return response 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getProductById = createAsyncThunk('products/getById', async (id , thunkAPI) => {
    try {
        const response = await productService.getProductById(id) 
        return response 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserProducts = createAsyncThunk('products/getUserProducs', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const response = await productService.getUserProducts(token)
        return response
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) 
    }
})

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.deleteProduct(id, token)  
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateProduct = createAsyncThunk('products/update', async (packageInfo, thunkAPI) => {
    const {newData, id} = packageInfo
    
    try {
        const token = thunkAPI.getState().auth.user.token
        const response = await productService.updateProduct(newData, id, token)  
        return response 
    } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          return thunkAPI.rejectWithValue(message)
      }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getUserProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = state.products.filter((product) => product._id !== action.payload._id)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = state.products.map(product => [action.payload].find(payload => payload._id === product._id) || product)
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                console.log(action.payload)
            })
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer