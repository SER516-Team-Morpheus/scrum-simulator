import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
