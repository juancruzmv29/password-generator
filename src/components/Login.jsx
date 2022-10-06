import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button } from "@mui/material"
import { usePass } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client/supabase'


// COMPONENTE DE PAGINA DE LOGIN
const Login = () => {

  const [email, setEmail] = useState("")
  // const [passsword, setPasssword] = useState("")
  const { signIn, loading } = usePass()
  const navigate =  useNavigate()
  
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const result = await supabase.auth.signIn({
        email
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
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
        <form onSubmit={handleSubmit}  sx={{  }}>
          <TextField
            id="outlined-email-input"
            label="E-Mail"
            type="email"
            autoComplete="current-email"
            sx={{ my: "7px" }}
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit' sx={{ mt: "5px" }} variant="contained" size="medium">
            {loading ? "Ingresando" : "Ingresar"}
          </Button>
        </form>
    </Box>
  )
}

export default Login