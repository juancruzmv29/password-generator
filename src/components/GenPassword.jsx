import React, { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Input from '@mui/material/Input';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { signs, upperLetters, lowerLetters, numbers } from "../utils/keys"
import { usePass } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client/supabase';


// COMPONENTE DE PAGINA PARA GENERAR EL PASSWORD
const GenPassword = () => {

    const [password, setPassword] = useState("")
    const [site, setSite] = useState("")
    const [sign, setSign] = useState(signs)
    const [upperLetter, setUpperLetter] = useState(upperLetters)
    const [lowerLetter, setLowerLetter] = useState(lowerLetters)
    const [number, setNumber] = useState(numbers)
    const { user, addPassword, loading } = usePass()
    const navigate =  useNavigate()


    // EFECTO PARA CUANDO SI HAY UBN USER REGISTRADO O NO
    useEffect(() => {
      
      if(!supabase.auth.user()) {
        navigate("/login")
      }

    }, [navigate])
    


    // PARA CREAR EL PASSWORD
    const handlePassword = e => {
      e.preventDefault()

      let passwordProcess

      if(sign) {
        const passSign = Math.floor(Math.random(sign)*(sign.length / 2))
        passwordProcess = passwordProcess + passSign
      }
      
      if(upperLetter) {
        const passUpper = Math.floor(Math.random(upperLetter)*(upperLetter.length / 2))
        passwordProcess = passwordProcess + passUpper
      }

      if(lowerLetter) {
        const passLower = Math.random(Math.random(lowerLetter)*(lowerLetter.length / 2))
        passwordProcess = passwordProcess + passLower
      }

      if(number) {
        const passNumber = Math.random(Math.random(number)*(number.length / 2))
        passwordProcess = passwordProcess + passNumber
      }

      const passwordNew = Math.floor(Math.random(passwordProcess)*(passwordProcess.length / 2))
      setPassword(passwordNew)
      
    }

    // PARA GUARDAR EL PASSWORD
    const handleSavePass = e => {
      e.preventDefault()

      addPassword(password, site)
    }

    // PARA RESETEAR EL PASSWORD
    const resetPassword = () => {
      setPassword("")
    }


  return (
    // CONTENEDOR DE CONTROL
    <Box>
        {/* TITULO DE GENERAR PASSWORD */}
        <Typography sx={{ fontSize:"1.5rem", fontWeight: "bold", mb: "1rem", textAlign: "center" }} >Generar password</Typography>
        {/* FORMULARIO DE CHECKBOX */}
        <FormGroup sx={{ width: "50%" }} className='form_control'>
          <FormControlLabel onClick={() => setSign(!sign)} control={<Checkbox defaultChecked />} label="Signos" />
          <FormControlLabel onClick={() => setUpperLetter(!upperLetter)} control={<Checkbox defaultChecked />} label="Mayúsculas" />
          <FormControlLabel onClick={() => setLowerLetter(!lowerLetter)} control={<Checkbox defaultChecked />} label="Minúsculas" />
          <FormControlLabel onClick={() => setNumber(!number)} control={<Checkbox defaultChecked />} label="Números" />
        </FormGroup>
        {/* DONDE VA APARECER EL PASSWORD Y EL BOTON PARA COPIAR AL CLICKBOARD */}
        <Box sx={{ mb:"1rem", width: "100%" }}>
          <Input sx={{ width: "70%" }} className='input_password' value={password} />
          <Button sx={{ width: "30%" }} >{<ContentCopyIcon/>}</Button>
        </Box>
        {/* PARA AGREGAR A DONDE PERTENECE EL PASSWORD Y ASI GUARDARLO EN LA LISTA */}
        <FormGroup onClick={handleSavePass} >
          <Input sx={{}} value={site} onChange={(e) => setSite(e.target.value)} placeholder="Sitio del password" />
          <Button>Guardar password</Button>
        </FormGroup>
        {/* BUTTONGROUP DONDE PODEMOS GENERAR OTRO PASSWORD O RESETAR EL DIV DONDE ESTA EL PASSWORD GENERADO */}
        <ButtonGroup>
            <Button onClick={handlePassword} >{loading ? "Generando" : "Generar password"}</Button>
            <Button onClick={resetPassword} >Resetear password</Button>
        </ButtonGroup>
    </Box>
  )
}

export default GenPassword