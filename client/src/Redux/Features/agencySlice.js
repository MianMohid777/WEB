import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authAgency: {},
  profile: {},
};

export const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    addAuthAgency: (state, action) => {
      return {
        ...state,
        authAgency: action.payload,
      };
    },
    addProfile: (state, action) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
  },
});

export const { addAuthAgency, addProfile } = agencySlice.actions;
export default agencySlice.reducer;
