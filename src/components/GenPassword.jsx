import React, { useState } from 'react'
import { Stack, Box, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { signs, upperLetters, lowerLetters, numbers } from "../utils/keys"

// COMPONENTE PARA GENERAR EL PASSWORD
const GenPassword = () => {

    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [sign, setSigns] = useState(signs)
    const [upperLetter, setUpperLetters] = useState(upperLetters)
    const [lowerLetter, setLowerLetter] = useState(lowerLetters)
    const [number, setNumber] = useState(numbers)


  return (
    // CONTENEDOR DE CONTROL
    <Box>
        {/* TITULO DE GENERAR PASSWORD */}
        <Typography></Typography>
        {/* FORMULARIO DE CHECKBOX */}
        <FormGroup></FormGroup>
        {/* DONDE VA APARECER EL PASSWORD Y EL BOTON PARA COPIAR AL CLICKBOARD */}
        <Box></Box>
        {/* BUTTONGROUP DONDE PODEMOS GENERAR OTRO PASSWORD O RESETAR EL DIV DONDE ESTA EL PASSWORD GENERADO */}
        <ButtonGroup>
            <Button></Button>
            <Button></Button>
        </ButtonGroup>
    </Box>
  )
}

export default GenPassword