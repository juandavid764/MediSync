import { supabase } from "./client.js";

export const validarUsuario = async (email, contrasena) => {
  const { data, error } = await supabase
    .from("usuarios_unificados")
    .select("*")
    .eq("email", email)
    .eq("contrasena", contrasena)
    .single();
    
  if (error) {
    console.log("Error al validar usuario:", error);
    console.error("Error al validar usuario:", error);
    return null;
  }

  console.log("Usuario validado:", data);

  return data
};
