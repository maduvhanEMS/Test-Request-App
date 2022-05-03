import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emailService from "./emailService";

const initialState = {
  isError: false,
  isCreated: false,
  isSuccess: false,
  message: "",
};

export const sendEmail = createAsyncThunk(
  "email/create",
  async (emailData, thunkAPI) => {
    try {
      return await emailService.sendRequestEmail(emailData);
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

export const emailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = emailSlice.actions;
export default emailSlice.reducer;
