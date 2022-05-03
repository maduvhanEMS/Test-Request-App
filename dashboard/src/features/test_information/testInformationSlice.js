import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testInformationService from "./testInformationService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  testInfo: [],
};

export const getTestInformation = createAsyncThunk(
  "testInformation/testbyid",
  async (id, thunkAPI) => {
    try {
      return await testInformationService.get_testInformation(id);
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

export const createTestInformation = createAsyncThunk(
  "testInformation/create",
  async (data, thunkAPI) => {
    try {
      return await testInformationService.createTestInformation(data);
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

export const updateTestInformation = createAsyncThunk(
  "testInformation/update",
  async (data, thunkAPI) => {
    try {
      return await testInformationService.update_testInformation(data);
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

export const testInformationSlice = createSlice({
  name: "testInformation",
  initialState: initialState,
  reducers: {
    resetTestInformation: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestInformation.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTestInformation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.testInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getTestInformation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createTestInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTestInformation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.testInfo.push(action.payload);
      })
      .addCase(createTestInformation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateTestInformation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        const index = state.testInfo.indexOf(
          (item) => item.id === action.payload.id
        );
        state.testInfo[index] = action.payload;
      })
      .addCase(updateTestInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testIno = action.payload;
      });
  },
});

export const { resetTestInformation } = testInformationSlice.actions;
export default testInformationSlice.reducer;
