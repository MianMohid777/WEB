import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authAgency: {},
};

export const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    addAuthAgency: (state, action) => {
      state.authAgency = action.payload;
    },
  },
});

export const { addAuthAgency } = agencySlice.actions;
export default agencySlice.reducer;
