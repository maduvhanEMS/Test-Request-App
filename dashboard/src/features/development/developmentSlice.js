import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import developmentService from "./developmentService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  devData: null,
};

export const createDevelopment = createAsyncThunk(
  "development/create",
  async (data, thunkAPI) => {
    try {
      return await developmentService.createDevelopment(data);
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

export const developmentSlice = createSlice({
  name: "development",
  initialState,
  reducers: {
    resetDev: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDevelopment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDevelopment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.devData = action.payload;
      })
      .addCase(createDevelopment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default developmentSlice.reducer;
