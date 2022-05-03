import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  message: "",
  products: [],
  product: null,
};

export const getProductsByName = createAsyncThunk(
  "products/name",
  async (data, thunkAPI) => {
    try {
      return await productsService.getProductsByName(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "create/Products",
  async (data, thunkAPI) => {
    try {
      return await productsService.createProduct(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getProductsByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByName.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProductsByName.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default productsSlice.reducer;
