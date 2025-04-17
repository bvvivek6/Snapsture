import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Booth from "./components/Booth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booth" element={<Booth />} />
      </Routes>
    </Router>
  );
};

export default App;
