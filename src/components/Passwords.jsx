import React, { useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { usePass } from '../context/UserContext'
import { supabase } from '../client/supabase'
import Password from './Password'


// COMPONENTE DE PAGINA DE LISTA DE PASSWORDS
const Passwords = () => {

  const { passwords, deletePass } = usePass()
  const navigate = useNavigate()

  // FUNCION PARA ELIMINAR PASS
  const handleDelete = (id) => {
    deletePass(id)
  }

  useEffect(() => {
    
    if(!supabase.auth.user()) {
      navigate("/login")
    }
  
  }, [navigate])


  

  return (
    <Box>
      <Typography>Lista de passwords</Typography>
      <Stack>
        {passwords.map((pass) => (
          <Password key={pass.id} pass={pass} handleDelete={handleDelete} />
        ))}
      </Stack>
    </Box>
  )
}

export default Passwords