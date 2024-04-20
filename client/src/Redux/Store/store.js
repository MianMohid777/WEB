import { api } from "../../Services/api";
import userReducer from "../Features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
