import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup";
import Dashboard from "./settings/Dashboard";
import ProtectedRoute from '../routeController/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route path="/account" element={<ProtectedRoute Component={Dashboard} />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
