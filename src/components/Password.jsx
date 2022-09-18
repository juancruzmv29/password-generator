import { Box, Button, ButtonGroup, Input, Typography } from '@mui/material'
import React, { useState } from 'react'

// COMPONENTE DEL PASSWORD DONDE PODEMOS ELIMINAR EL PASSWORD O MOSTRARLO
const Password = ({ pass, handleDelete }) => {

    const [showPass, setShowPass] = useState(false)
    const { site, password, id } = pass

    
  return (
    <Box>
        <Typography>{site}</Typography>
        <Box>
            <Input value={password} type={showPass ? "password" : "text"} />
            <ButtonGroup>
                <Button onClick={() => setShowPass(!showPass)} >Show pass</Button>
                <Button onClick={() => handleDelete(id)}>Delete pass</Button>
            </ButtonGroup>
        </Box>
    </Box>
  )
}

export default Password