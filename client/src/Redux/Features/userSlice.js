import { createSlice } from "@reduxjs/toolkit";
import React, { useState } from "react";

const initialState = {
  users: [{ name: "test", email: "test@gmail.com", password: "test1234" }],
};

// export const user = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
// });
