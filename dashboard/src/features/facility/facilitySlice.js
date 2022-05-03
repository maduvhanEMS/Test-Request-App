import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import facilityService from "./faciltyService";

const initialState = {
  facilities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchFacilities = createAsyncThunk(
  "facilities/getAll",
  async (_, thunkAPI) => {
    try {
      return await facilityService.getFacilities();
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

export const getFacility = createAsyncThunk(
  "facilities/id",
  async (id, thunkAPI) => {
    try {
      return await facilityService.getFacility(id);
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

export const facilitySlice = createSlice({
  name: "facility",
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.facilities = action.payload;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFacility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFacility.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.facilities = action.payload;
      })
      .addCase(getFacility.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = facilitySlice.actions;
export default facilitySlice.reducer;
