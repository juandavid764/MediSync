import { supabase } from "../client.js";

// Función para obtener todos los registros de la tabla "medico"
export const getAllMedicos = async () => {
  try {
    const { data, error } = await supabase.from("medico").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error obteniendo médicos:", error);
    return null;
  }
};

// Función para obtener un médico por su ID
export const getMedicoById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("medico")
      .select("*")
      .eq("id_medico", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error obteniendo médico por ID:", error);
    return null;
  }
};

// Función para crear un nuevo médico
export const createMedico = async (medico) => {
  try {
    const { data, error } = await supabase
      .from("medico")
      .insert([medico])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creando médico:", error);
    return null;
  }
};

// Función para actualizar un médico existente
export const updateMedico = async (id, updatedFields) => {
  try {
    const { data, error } = await supabase
      .from("medico")
      .update(updatedFields)
      .eq("id_medico", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error actualizando médico:", error);
    return null;
  }
};

// Función para eliminar un médico por su ID
export const deleteMedico = async (id) => {
  try {
    const { data, error } = await supabase
      .from("medico")
      .delete()
      .eq("id_medico", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error eliminando médico:", error);
    return null;
  }
};
