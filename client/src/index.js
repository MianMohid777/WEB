import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Users/Tourist/Home";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import TouristSignIn from "./Users/Tourist/TouristSignIn";
import AgencySignIn from "./Users/Agency/AgencySignIn";
import LoginAs from "./Users/Common/LoginAs";
import AgencyRegister from "./Users/Agency/AgencyRegister";
import AgencyHome from "./Users/Agency/AgencyHome";
import AdminSignIn from "./Users/Admin/AdminSignIn";
import AdminHome from "./Users/Admin/AdminHome";
import AgencyProfile from "./Users/Agency/AgencyProfile";
import CreateTour from "./Users/Agency/CreateTour";
import Analytics from "./Users/Admin/Analytics";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      {/* Tourist Routes */}
      <Route path="/" element={<LoginAs />} />
      <Route path="/tourist-login" element={<TouristSignIn />} />   
      <Route path="/home" element={<Home />} />

      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminSignIn />} />
      <Route path="/admin-dashboard" element={<AdminHome />} />
      <Route path="/admin-dashboard/analytics" element={<Analytics />} />

      {/* Agency Routes */}
      <Route path="/agency-home" element={<AgencyHome />} />
      <Route path="/agency-login" element={<AgencySignIn />} />
      <Route path="/agency-registeration" element={<AgencyRegister />} />
      <Route path="/agencyid/profile" element={<AgencyProfile />} />
      <Route path="/agencyid/create-tour" element={<CreateTour />} />

    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
