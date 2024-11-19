import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import Operation from "../pages/Operation";


const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/Operation' element={<Operation/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
