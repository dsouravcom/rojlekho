import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup";
import ForgotPass from "./components/auth/ForgotPass";
import Dashboard from "./settings/Dashboard";
import NewJournal from "./components/journal/NewJournal";
import EditJournal from "./components/journal/EditJournal";
import JournalPage from "./components/journal/JournalPage";
import ProtectedRoute from '../routeController/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route path="/account" element={<ProtectedRoute Component={Dashboard} />} />
          <Route path="/create" element={<ProtectedRoute Component={NewJournal} />} />
          <Route path="/edit/:id" element={<ProtectedRoute Component={EditJournal} />} />
          <Route path="/post/:id" element={<ProtectedRoute Component={JournalPage} />} />
          <Route path="/account" element={<ProtectedRoute Component={Dashboard} />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
