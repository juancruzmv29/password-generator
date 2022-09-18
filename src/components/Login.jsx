import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, FormGroup } from "@mui/material"
import { usePass } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client/supabase'


// COMPONENTE DE PAGINA DE LOGIN
const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, loading } = usePass()
  const navigate =  useNavigate()
  
  const handleSubmit = e => {
    e.preventDefault()

    signIn(email, password)
  }

  useEffect(() => {
    
    if(supabase.auth.user()) {
      navigate("/")
    }
  
  }, [navigate])
  

  return (
    <Box>
        {/* TITULO DE GENERAR PASSWORD */}
        <Typography sx={{ fontSize:"1.5rem", fontWeight: "bold", mb: "1rem", textAlign: "center" }} >Iniciar Sesión</Typography>
        {/* FORMULARIO DE  INICIAR SESION */}
        <FormGroup onSubmit={handleSubmit}  sx={{  }}>
          <TextField
            id="outlined-email-input"
            label="E-Mail"
            type="email"
            autoComplete="current-email"
            sx={{ my: "7px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ my: "7px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button sx={{ mt: "5px" }} variant="contained" size="medium">
            {loading ? "Ingresando" : "Ingresar"}
          </Button>
        </FormGroup>
    </Box>
  )
}

export default Login