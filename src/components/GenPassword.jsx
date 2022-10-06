import React, { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Input from '@mui/material/Input';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import {CopyToClipboard} from 'react-copy-to-cli
import generatePassword from '../utils/genPass';


// COMPONENTE DE PAGINA PARA GENERAR EL PASSWORD
const GenPassword = () => {

  // ESTADO PARA AÑADIR EL SITIO DEL PASSWORD CREADO
    // const [site, setSite] = useState("")
    // const [copy, setCopy] = useState({ value: password, copied: false })
    // const [copy, setCopy] = useState({})
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)
    // ESTADO DONDE TENDREMOS LA CONFIGURACION, QUE SERA UN OBJETO CON LAS PROPIEDADES QUE TENEMOS EN LA FUNCION GENPASS.JS PERO SIN EL NUMERO DE CARACTERES
    const [configuration, setConfiguration] = useState({
      numeroDeCaracteres: 7,
      simbolos: true,
      mayusculas: true,
      minusculas: true,
      numeros: true
    })
    // ESTADO PARA SABER SI SE HA GENERADO EL PASSWORD
    const [passGenerated, setChangePass] = useState("")
    // const { addPassword, loading, signOut } = usePass()
    // const navigate =  useNavigate()


    // EFECTO PARA CUANDO SI HAY UBN USER REGISTRADO O NO
    /* useEffect(() => {
      
      if(!supabase.auth.user()) {
        navigate("/login")
      }

    }, [navigate])
    */

    // EFECTO PARA CUANDO SE CAMBIE LA CONFIGURACIÓN
    useEffect(() => {
      setChangePass(generatePassword(configuration))
    }, [configuration])
    
    // FUNCION PARA COPIAR LA CONTRASEÑA AL PORTAPAPELES
    const copyToClipboard = async (pass) => {
      await navigator.clipboard.writeText(pass)
      // setCopy({ [pass]: true })
      setCopied(true)
      alert("Password copied to clipboard")
      setTimeout(() => {
        setCopied(false)
      }, 6000);
    }

    // FUNCION PARA INCREMENTAR EL NUMERO DE CARACTERES
    const incrementarNumCaracteres = () => {
      setConfiguration((configAnterior) => {
        const newCofig = {...configAnterior}
        newCofig.numeroDeCaracteres += 1
        return newCofig
      })
    }

    // FUNCION PARA DISMINUIR LA CANTIDAD DE CARACTERES
    const disminuirNumCaracteres = () => {
      if(configuration.numeroDeCaracteres > 1) {
        setConfiguration((configAnterior) => {
          const newConfig = {...configAnterior}
          newConfig.numeroDeCaracteres -= 1
          return newConfig
        })
      }
    }

    // FUNCION PARA CAMBIAR LA CONFIGURACION DE SIMBOLOS
    const toggleSimbolos = () => {
      setConfiguration((configAnterior) => {
        const newConfig = {...configAnterior}
        newConfig.simbolos = !newConfig.simbolos
        return newConfig
      })
    }

    // FUNCION PARA CAMBIAR LA CONFIGURACION DE NUMEROS
    const toggleNumeros = () => {
      setConfiguration((configAnterior) => {
        const newConfig = {...configAnterior}
        newConfig.numeros = !newConfig.numeros
        return newConfig
      })
    }

    // FUNCION PARA CAMBIAR LA CONFIGURACION DE MAYUSCULAS
    const toggleMayusculas = () => {
      setConfiguration((configAnterior) => {
        const newConfig = {...configAnterior}
        newConfig.mayusculas = !newConfig.mayusculas
        return newConfig
      })
    }

    // FUNCION PARA CAMBIAR LA CONFIGURACION DE MINUSCULAS
    const toggleMinusculas = () => {
      setConfiguration((configAnterior) => {
        const newConfig = {...configAnterior}
        newConfig.minusculas = !newConfig.minusculas
        return newConfig
      })
    }

    // PARA CREAR EL PASSWORD
    const handlePassword = e => {
      e.preventDefault()
      setLoading(true)
      setTimeout(() => {
        setChangePass(generatePassword(configuration))
        setLoading(false)
      }, 3000);
      /* if(passGenerated) {
        setCopied(!copied)
      }*/
    }

    // PARA GUARDAR EL PASSWORD
    /* const handleSavePass = e => {
      e.preventDefault()

      if(passGenerated.length > 0 && site.length > 0) {
        addPassword(passGenerated, site)
        alert("Password generated saved!")
      } else {
        alert("You must set the password's site")
      }
    }
    */

    // PARA RESETEAR EL PASSWORD
    const resetPassword = () => {
      setChangePass("")
    }


  return (
    // CONTENEDOR DE CONTROL
    <Box>
        {/* TITULO DE GENERAR PASSWORD */}
        <Typography sx={{ fontSize:"1.5rem", fontWeight: "bold", mb: "1rem", textAlign: "center" }} >Generar password</Typography>
        {/* FORMULARIO DE CHECKBOX */}
        <Box sx={{ display: "flex" }}>
          <FormGroup sx={{ width: "50%" }} className='form_control'>
            <FormControlLabel onClick={() => toggleSimbolos()} control={<Checkbox defaultChecked />} label="Signos" />
            <FormControlLabel onClick={() => toggleMayusculas()} control={<Checkbox defaultChecked />} label="Mayúsculas" />
            <FormControlLabel onClick={() => toggleMinusculas()} control={<Checkbox defaultChecked />} label="Minúsculas" />
            <FormControlLabel onClick={() => toggleNumeros()} control={<Checkbox defaultChecked />} label="Números" />
          </FormGroup>
          <Box sx={{ width: "50%", textAlign: "center" }} >
            <Typography sx={{ fontWeight: "bold" }} >Cantidad de caract: {configuration.numeroDeCaracteres}</Typography>
            <ButtonGroup>
              <Button onClick={disminuirNumCaracteres} >-</Button>
              <Button onClick={incrementarNumCaracteres} >+</Button>
            </ButtonGroup>
          </Box>
        </Box>
        {/* DONDE VA APARECER EL PASSWORD Y EL BOTON PARA COPIAR AL CLICKBOARD */}
        <Box sx={{ mb:"1rem", width: "100%" }}>
          <Input readOnly={true} name='' sx={{ width: "70%" }} className='input_password' value={passGenerated} />
          <Button onClick={() => copyToClipboard(passGenerated)} >{copied ? "Copied" : "Copy"}</Button>
        </Box>
        <Box sx={{ mb: "5px" }}>
              <Button sx={{ width: "50%" }} onClick={handlePassword} >{loading ? "Generando" : "Generar pass"}</Button>
              <Button sx={{ width: "50%" }} onClick={resetPassword} >Reset password</Button>
        </Box>
    </Box>
  )
}

export default GenPassword