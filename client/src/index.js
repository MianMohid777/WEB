import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Tourist/Layout";
import Home from "./Tourist/Home";
import About from "./Tourist/About";
import User from "./Tourist/User";
import Profile from "./Tourist/Profile";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import SignIn from "./Tourist/SignIn";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./Services/api";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
