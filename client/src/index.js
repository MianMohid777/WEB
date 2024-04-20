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
import LoginAs from "./CommonUser/LoginAs"
const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<Layout />}>
    //   <Route path="home" element={<Home />} />
    //   <Route path="about" element={<About />} />
    //   <Route path="/users/:userId" element={<User />} />
    //   <Route path="home/profile" element={<Profile />} />
    // </Route>
    //<Route path="/home" element={<Home />} />
    <Route path="/login" element = {<LoginAs/>} />

  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider >
  <RouterProvider router={router} />
  // </Provider>
);