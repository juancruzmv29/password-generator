import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenPassword from "./components/GenPassword";
import Login from "./components/Login";
import Passwords from "./components/Passwords";

// COMPONENTE PRINCIPAL QUE CONTENDRA LAS RUTAS CON SUS ELEMENTOS
const App = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{
          background: "#e1e1e1",
          mt: "5rem",
          p: "3rem",
          borderRadius: "30px",
        }}
      >
        <Routes>
          <Route path="/" exact element={<GenPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwords" element={<Passwords />} />
          <Route />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
