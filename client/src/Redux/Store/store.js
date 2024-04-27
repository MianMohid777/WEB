import { api } from "../../Services/api";
import userReducer from "../Features/userSlice";
import agencyReducer from "../Features/agencySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    agency: agencyReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
