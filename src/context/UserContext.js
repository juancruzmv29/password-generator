import { createContext, useContext, useState } from "react";
import { supabase } from "../client/supabase"

// CREAMOS EL CONTEXTO
export const PasswordContext = createContext()

// VEMOS SI HAY UN CONTEXTO
export const usePass = () => {
    const context = useContext(PasswordContext)
    if(!context) {
        throw new Error ("usePass need a context")
    }
    return context
}

export const PasswordContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [passwords, setPasswords] = useState([])
    const [loading, setLoading] = useState(false)

    // PARA INICIAR SESION
    const signIn = async (email, password) => {

        setLoading(true)
        try {
            const { user, error } = await supabase.auth.signIn({
                email,
                password
            })
            if(error) throw Error
            console.log(user)
            setUser(user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // PARA CERRAR SESION
    const signOut = () => {

        try {
            const { error } = supabase.auth.signOut()
            if(error) throw Error
            setUser(null)
        } catch (error) {
            console.log(error)
        } 

    }


    // PARA OBTENER LOS PASSWORDS
    const getPasswords = async () => {

        setLoading(true)
        try {
            const user = supabase.auth.user()
            const { data, error } = await supabase
                .from("passwords")
                .select()
                .eq("userId", user.id)
                .order("id", { ascending: true })
            setPasswords(data)
            if(error) throw Error
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    // PARA ELIMINAR PASSWORD
    const deletePassword = async (id) => {

        setLoading(true)
        try {
            const user = supabase.auth.user()
            const { data, error, } = await supabase
                .from("passwords")
                .delete()
                .eq("userId", user.id)
                .eq("id", id)
            if(error) throw Error
            setPasswords(data.filter((tweet) => tweet.id !== id))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }


    // PARA AGREGAR PASSWORD
    const addPassword = async (site, password) => {

        setLoading(true)
        try {
            const user = supabase.auth.user()
            const { data, error } = await supabase
                .from("passwords")
                .insert([{ site, password }])
                .eq("userId", user.id)
            setPasswords([...passwords, ...data])
            if(error) throw Error
        } catch (error) {
            console.log(error)            
        } finally {
            setLoading(false)
        }

    }

    return (
        <PasswordContext.Provider value={{ user, signIn, signOut, passwords, getPasswords, deletePassword, addPassword, loading }} >
            {children}
        </PasswordContext.Provider>
    )

}