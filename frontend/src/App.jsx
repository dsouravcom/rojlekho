import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup";
import ForgotPass from "./pages/auth/ForgotPass";
import Dashboard from "./settings/Dashboard";
import NewJournal from "./pages/journal/NewJournal";
import EditJournal from "./pages/journal/EditJournal";
import JournalPage from "./pages/journal/JournalPage";
import SearchList from "./pages/journal/SearchList";
import ProtectedRoute from "./protectedRoutes/Protected"
import VerifyEmail from "./pages/auth/VerifyEmail";

function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><NewJournal /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditJournal /></ProtectedRoute>} />
          <Route path="/post/:id" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
          <Route path="/search/:query" element={<ProtectedRoute><SearchList /></ProtectedRoute>} />
          
        </Routes>
    </>
  );
}

export default App;
