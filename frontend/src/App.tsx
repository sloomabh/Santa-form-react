import React from "react"; // Add this import
import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
