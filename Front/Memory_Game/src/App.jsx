import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./components/Start";
import Cards from "./components/Cards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<Cards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;