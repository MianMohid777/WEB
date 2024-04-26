import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Users/Tourist/Layout";
import Home from "./Users/Tourist/Home";
import About from "./Users/Tourist/About";
import Profile from "./Users/Tourist/Profile";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import TouristSignIn from "./Users/Tourist/TouristSignIn";
import AgencySignIn from "./Users/Agency/AgencySignIn";
import LoginAs from "./Users/Common/LoginAs";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./Services/api";
import AgencyRegister from "./Users/Agency/AgencyRegister";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginAs />} />
      <Route path="/tourist-login" element={<TouristSignIn />} />
      <Route path="/agency-login" element={<AgencySignIn />} />
      <Route path="/agency-registeration" element={<AgencyRegister />} />
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
