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
import CreateTour from "./Users/Agency/CreateTour";
import Analytics from "./Users/Admin/Analytics";
import SignUp from "./Users/Tourist/SignUp";
import ToastMessage from "./Utils/Toast-Message";
import Test from "./Users/Agency/Test";
import Profile from "./Users/Tourist/Profile";
import AgencyAnalytics from "./Users/Agency/AgencyAnalytics";
import PastAds from "./Users/Agency/PastAds";
import ActiveAds from "./Users/Agency/ActiveAds";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Tourist Routes */}
      <Route path="/" element={<LoginAs />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tourist-login" element={<TouristSignIn />} />
      <Route path="/tourist-signup" element={<SignUp />} />
      <Route path="/tourist-profile" element={<Profile />} />

      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminSignIn />} />
      <Route path="/admin-dashboard" element={<AdminHome />} />
      <Route path="/admin-dashboard/analytics" element={<Analytics />} />

      {/* Agency Routes */}
      <Route path="/agency-home" element={<AgencyHome />} />
      <Route path="/current-agency/analytics" element={<AgencyAnalytics />} />
      <Route path="/current-agency/active-ads" element={<ActiveAds />} />
      <Route path="/current-agency/past-ads" element={<PastAds />} />
      <Route path="/agency-login" element={<AgencySignIn />} />
      <Route path="/agency-registeration" element={<AgencyRegister />} />
      <Route path="/current-agency/profile" element={<AgencyProfile />} />
      <Route path="/current-agency/create-tour" element={<CreateTour />} />
      <Route path="/test" element={<ToastMessage />} />
      <Route path="/agency-profile" element={<AgencyProfile />} />
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
