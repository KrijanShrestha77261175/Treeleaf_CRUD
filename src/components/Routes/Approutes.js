import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes.constant";
import App from "../../App";
import Profiles from "../Pages/Profiles";

const Approutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<App />} />
      <Route path={ROUTES.PROFILES} element={<Profiles />} />
    </Routes>
  );
};

export default Approutes;
