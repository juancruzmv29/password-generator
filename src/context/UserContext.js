import { createContext, useContext, useState } from "react";
import { supabase } from "../client/supabase";

// CREAMOS EL CONTEXTO
export const PasswordContext = createContext();

// VEMOS SI HAY UN CONTEXTO
export const usePass = () => {
  const context = useContext(PasswordContext);
  if (!context) throw new Error("usePass need a context");
  return context;
};

export const PasswordContextProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);

  // PARA INICIAR SESION
  const signIn = async (email) => {

        setLoading(true)
        try {
            const { user, error } = await supabase.auth.signIn({
                email,
            })
            console.log(user)
            if(error) throw error
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  // PARA CERRAR SESION
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // PARA OBTENER LOS PASSWORDS
  const getPasswords = async () => {
    setLoading(true);
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from("password-list")
      .select()
      .eq("userId", user.id)
      .order("id", { ascending: true });

    if (error) throw error;
    setPasswords(data);
    setLoading(false)
  };

  // PARA ELIMINAR PASSWORD
  const deletePassword = async (id) => {
    setLoading(true);
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from("password-list")
      .delete()
      .eq("userId", user.id)
      .eq("id", id);
    if (error) throw error;
    setPasswords(data.filter((tweet) => tweet.id !== data[0].id));
  };

  // PARA AGREGAR PASSWORD
  const addPassword = async (site, password) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("password-list")
        .insert({ site, password, userId: user.id });
      if (error) throw error;
      setPasswords([...passwords, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordContext.Provider
      value={{
        signIn,
        signOut,
        passwords,
        getPasswords,
        deletePassword,
        addPassword,
        loading,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
