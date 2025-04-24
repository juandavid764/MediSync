import { supabase } from "../client.js";

// Función para obtener todos los registros de la tabla "ciudad"
export const getAllCiudades = async () => {
  try {
    const { data, error } = await supabase.from("ciudad").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error obteniendo ciudades:", error);
    return null;
  }
};

// Función para obtener una ciudad por su ID
export const getCiudadById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("ciudad")
      .select("*")
      .eq("id_cuidad", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error obteniendo ciudad por ID:", error);
    return null;
  }
};

// Función para crear una nueva ciudad
export const createCiudad = async (ciudad) => {
  try {
    const { data, error } = await supabase
      .from("ciudad")
      .insert([ciudad])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creando ciudad:", error);
    return null;
  }
};

// Función para actualizar una ciudad existente
export const updateCiudad = async (id, updatedFields) => {
  try {
    const { data, error } = await supabase
      .from("ciudad")
      .update(updatedFields)
      .eq("id_cuidad", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error actualizando ciudad:", error);
    return null;
  }
};

// Función para eliminar una ciudad por su ID
export const deleteCiudad = async (id) => {
  try {
    const { data, error } = await supabase
      .from("ciudad")
      .delete()
      .eq("id_cuidad", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error eliminando ciudad:", error);
    return null;
  }
};
