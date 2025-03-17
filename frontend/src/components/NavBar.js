import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './NavBar';
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // Hide Navbar on login page

  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />} 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/files" element={<FileList />} />
      </Routes>
    </div>
  );
}

export default App;
