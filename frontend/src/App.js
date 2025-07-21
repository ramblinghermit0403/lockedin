import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Header from "./components/Header";
import Features from "./pages/Features";
import Workouts from "./pages/Workouts";
import BMRCalculator from "./pages/BMRCalculator";
import NutritionChecker from "./pages/NutritionChecker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      {/* REMOVE Bootstrap Container */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/features" element={<Features />} />
          <Route path="/pages/workouts" element={<Workouts />} />
          <Route
            path="/pages/nutrition-checker"
            element={<NutritionChecker />}
          />
          <Route path="/pages/bmr-calculator" element={<BMRCalculator />} />
          <Route path="/pages/about" element={<About />} />

          <Route path="" element={<PublicRoute />}>
            <Route path="/pages/register" element={<Register />} />
            <Route path="/pages/login" element={<Login />} />
          </Route>

          <Route path="" element={<PrivateRoute />}>
            <Route path="/pages/profile/*" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
