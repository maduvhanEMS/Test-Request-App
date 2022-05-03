import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CCTest_informationService from "./CCTest_informationService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  testInfo: [],
};

export const getTestInformation = createAsyncThunk(
  "CCtestInformation/testbyid",
  async (id, thunkAPI) => {
    try {
      return await CCTest_informationService.get_testInformation(id);
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

export const createCCTestInformation = createAsyncThunk(
  "CCtestInformation/create",
  async (data, thunkAPI) => {
    try {
      return await CCTest_informationService.createTestInformation(data);
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

export const updateCCTestInformation = createAsyncThunk(
  "CCtestInformation/update",
  async (data, thunkAPI) => {
    try {
      return await CCTest_informationService.update_testInformation(data);
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

export const CCtestInformationSlice = createSlice({
  name: "CCtestInformation",
  initialState: initialState,
  reducers: {
    resetCCTestInformation: (state) => {
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
      .addCase(createCCTestInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCCTestInformation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.testInfo.push(action.payload);
      })
      .addCase(createCCTestInformation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateCCTestInformation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        const index = state.testInfo.indexOf(
          (item) => item.id === action.payload.id
        );
        state.testInfo[index] = action.payload;
      })
      .addCase(updateCCTestInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testInfo = action.payload;
      });
  },
});

export const { resetCCTestInformation } = CCtestInformationSlice.actions;
export default CCtestInformationSlice.reducer;
