import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import FormbuilderPreview from "./components/FormbuilderPreview";
import FormViewer from "./components/FormViewer";
import './App.css';
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<FormbuilderPreview />} />
        <Route path="/form/:id" element={<FormViewer />} />
      </Routes>
    </Router>
  );
}

export default App;





