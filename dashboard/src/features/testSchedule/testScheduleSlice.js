import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testScheduleService from "./testScheduleService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  message: "",
  schedule: [],
};

export const createTestSchedule = createAsyncThunk(
  "testSchedule/create",
  async (data, thunkAPI) => {
    try {
      return await testScheduleService.createTestSchedule(data);
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

export const updateTestSchedule = createAsyncThunk(
  "testSchedule/update",
  async (data, thunkAPI) => {
    try {
      return await testScheduleService.updateTestSchedule(data);
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

export const getTestSchedule = createAsyncThunk(
  "testSchedule/getAll",
  async (thunkAPI) => {
    try {
      return await testScheduleService.getTestSchedule();
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

export const testScheduleSlice = createSlice({
  name: "testSchedule",
  initialState: initialState,
  reducers: {
    resetTestsSchedule: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    resetTestsScheduleUpadte: (state) => {
      state.isUpdated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateTestSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTestSchedule.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isUpdated = true;
        const index = state.schedule.indexOf(
          (item) => item.id === action.payload.id
        );
        state.schedule[index] = action.payload;
      })
      .addCase(updateTestSchedule.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getTestSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestSchedule.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.schedule = action.payload;
      })
      .addCase(getTestSchedule.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createTestSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTestSchedule.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.schedule.push(action.payload);
      })
      .addCase(createTestSchedule.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { resetTestsSchedule, resetTestsScheduleUpadte } =
  testScheduleSlice.actions;
export default testScheduleSlice.reducer;
