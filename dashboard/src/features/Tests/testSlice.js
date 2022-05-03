import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testService from "./testService";

const initialState = {
  isError: false,
  isCreated: false,
  isSuccess: false,
  message: "",
  isUpdated: false,
  testData: [],
  testID: null,
};

export const register_request = createAsyncThunk(
  "test_requests/create",
  async (test_data, thunkAPI) => {
    try {
      return await testService.sendData(test_data);
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

export const update_request = createAsyncThunk(
  "test_requests/updateTest",
  async (test_data, thunkAPI) => {
    try {
      return await testService.updateTest(test_data);
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

export const get_requests = createAsyncThunk(
  "test_requests/getPerPage",
  async (page, thunkAPI) => {
    try {
      return await testService.getTestData(page);
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

export const get_ID = createAsyncThunk(
  "test_request/lastestId",
  async (_, thunkAPI) => {
    try {
      return await testService.getId();
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

export const testRequestSlice = createSlice({
  name: "test_request",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isUpdated = false;
    },
    resetCreated: (state) => {
      state.isCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register_request.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register_request.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isCreated = true;
        state.testData.push(action.payload);
      })
      .addCase(register_request.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(get_requests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_requests.fulfilled, (state, action) => {
        state.testData = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(get_requests.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(update_request.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isUpdated = true;
        const index = state.testData.indexOf(
          (item) => item.id === action.payload.id
        );
        state.testData[index] = action.payload;
      })
      .addCase(update_request.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(get_ID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_ID.fulfilled, (state, action) => {
        state.testID = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(get_ID.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset, resetCreated } = testRequestSlice.actions;
export default testRequestSlice.reducer;
