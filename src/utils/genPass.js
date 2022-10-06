// FUNCION PARA CREAR EL PASSWORD, LE PASAMOS COMO ARGUMENTO LA CONFIG
const generatePassword = (config) => {
    // cREAMOS UN OBJETO CON TODOS LOOS CARACTERES
    const chars = {
        numeros: "0 1 2 3 4 5 6 7 8 9",
        simbolos: "! @ # $ % / *",
        mayusculas: "A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z",
        minusculas: "a b c d e f g h i j k l m n ñ o p q r s t u v w x y z"
    }

    // VARIABLE LOS CARACTERES FINALES
    let finalChars = ""
    // LA VARIABLE PASSWORD VA A COMENZAR COMO UN STRING VACIO
    let password = ""

    // RECORREMOS CADA PROPIEDAD DE LA CONFIGURACION
    for(let prop in config) {
        // SI LA PROP ES VERDADERA AGREGAMOS LA PROP
        if(config[prop] === true) {
            finalChars += chars[prop] + " "
        }
    }

    // FINALCHARS VA A SER TODO + LOS CHARS EN MINUSUCLAS
    finalChars = finalChars + chars.minusculas
    // A FINALCHARS LE SACAMOS LOS ESPPACIOS EN BLANCO
    finalChars = finalChars.trim()
    // TAMBIEN LE CORTAMOS LOS ESPACIOS EN BLANCO
    finalChars = finalChars.split(" ")

    // SEGUN EL NUMERO DE CARACTERES VAMOS A CALCULAR LA LONGUTD DEL PASSWORD
    for(let i = 0; i < config.numeroDeCaracteres; i++) {
        // CALCULAMOS UN NUMERO RANDOM * LA LONGITUD DEL FINALCHARS Y A TODO ESO LO REDONDEAMOS
        password = password + finalChars[Math.floor(Math.random() * finalChars.length)]
    }

    // FINALMENTRE RETORNAMOS EL PASSWORD
    return password
}

export default generatePassword