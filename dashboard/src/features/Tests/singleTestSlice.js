import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testService from "./testService";

const initialState = {
  status: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  isUpdated: false,
  testInfo: [],
};

export const get_requests = createAsyncThunk(
  "test_requests/reportNo",
  async (reportNo, thunkAPI) => {
    try {
      return await testService.getTestDataByID(reportNo);
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

export const getAll_requests = createAsyncThunk(
  "test_requests/facilityId",
  async (facility, thunkAPI) => {
    try {
      return await testService.getTestDataByFacilityId(facility);
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

export const singleTestRequestSlice = createSlice({
  name: "singleTest",
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_requests.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(get_requests.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(get_requests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testInfo = action.payload;
      })
      .addCase(getAll_requests.fulfilled, (state, action) => {
        state.testInfo = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reset } = singleTestRequestSlice.actions;

export default singleTestRequestSlice.reducer;
