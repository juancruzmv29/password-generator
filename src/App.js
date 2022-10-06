import React from "react";
import { Box } from "@mui/material";
import GenPassword from "./components/GenPassword";

// COMPONENTE PRINCIPAL QUE CONTENDRA LAS RUTAS CON SUS ELEMENTOS
const App = () => {
  

  return (
      <Box
        sx={{
          background: "#e1e1e1",
          mt: "5rem",
          p: "3rem",
          borderRadius: "30px",
          width: "400px"
        }}
      >
        <GenPassword/>
      </Box>
  );
};

export default App;
