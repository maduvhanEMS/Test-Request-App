import { createSlice } from "@reduxjs/toolkit";

export const postData = createSlice({
  name: "testForms",
  initialState: [],
  reducers: {
    postRequest: (state, action) => {
      //send test request form
      state = state.push(action.payload);
    },
    editTestRequest: (state, action) => {},
    updateStatus: (state, action) => {
      const { currentId, status } = action.payload;
      console.log(action.payload);
      const test = state.find((item) => parseInt(item.id) === currentId);
      console.log(test);
      if (test) {
        test.status = status;
      }
    },
  },
});

export const { postRequest, editTestRequest, updateStatus } = postData.actions;
export const selectTestData = (state) => state.testForms;
export default postData.reducer;
