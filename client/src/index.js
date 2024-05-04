import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import Home from "./Users/Tourist/Home";
import TouristSignIn from "./Users/Tourist/TouristSignIn";
import AgencySignIn from "./Users/Agency/AgencySignIn";
import LoginAs from "./Users/Common/LoginAs";
import AgencyRegister from "./Users/Agency/AgencyRegister";
import AgencyHome from "./Users/Agency/AgencyHome";
import AdminSignIn from "./Users/Admin/AdminSignIn";
import AdminHome from "./Users/Admin/AdminHome";
import AgencyProfile from "./Users/Agency/AgencyProfile";
import Analytics from "./Users/Admin/Analytics";
import SignUp from "./Users/Tourist/SignUp";
import ToastMessage from "./Utils/Toast-Message";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginAs />} />
      <Route path="/tourist-login" element={<TouristSignIn />} />
      <Route path="/tourist-signup" element={<SignUp />} />
      <Route path="/agency-login" element={<AgencySignIn />} />
      <Route path="/agency-registeration" element={<AgencyRegister />} />
      <Route path="/agency-home" element={<AgencyHome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin-login" element={<AdminSignIn />} />
      <Route path="/admin-dashboard" element={<AdminHome />} />
      <Route path="/admin-dashboard/analytics" element={<Analytics />} />
      <Route path="/agency-profile" element={<AgencyProfile />} />
      <Route path="/test" element={<ToastMessage />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
