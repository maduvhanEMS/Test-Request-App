import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentService from "./departmentService";

const initialState = {
  departments: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
  message: "",
};

export const fetchDepartments = createAsyncThunk(
  "departments/getAll",
  async (thunkAPI) => {
    try {
      return await departmentService.getDepartments();
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

export const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
        state.isLoading = false;
      });
  },
});

export default departmentSlice.reducer;
