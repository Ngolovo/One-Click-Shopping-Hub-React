import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Register from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SellerHome from "./pages/sellerHome";
import AddProductPage from "./pages/AddProductPage";

const App = () => {
  return (
    <Routes >
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/seller" element={<SellerHome />} />
      <Route path="/add-product" element={<AddProductPage />} />
    </Routes>
  );
};

export default App;
