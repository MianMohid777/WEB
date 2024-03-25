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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="/users/:userId" element={<User />} />
      <Route path="home/profile" element={<Profile />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
