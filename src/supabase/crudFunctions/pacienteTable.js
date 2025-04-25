import { supabase } from "../client.js";

// Función para obtener todos los registros de la tabla "paciente"
export const getPacientes = async () => {
  try {
    const { data, error } = await supabase.from("paciente").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error obteniendo pacientes:", error);
    return null;
  }
};

// Función para obtener un paciente por su ID
export const getPacienteById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("paciente")
      .select("*")
      .eq("id_paciente", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error obteniendo paciente por ID:", error);
    return null;
  }
};

// Función para crear un nuevo paciente
export const createPaciente = async (paciente) => {
  try {
    const { data, error } = await supabase
      .from("paciente")
      .insert([paciente])
      .select();
    if (error) throw error;
    return data[0]; // Retorna el paciente creado
  } catch (error) {
    console.error("Error creando paciente:", error);
    return null;
  }
};

// Función para actualizar un paciente existente
export const updatePaciente = async (id, updatedFields) => {
  try {
    const { data, error } = await supabase
      .from("paciente")
      .update(updatedFields)
      .eq("id_paciente", id);
    if (error) throw error;
    return data[0]; // Retorna el paciente actualizado
  } catch (error) {
    console.error("Error actualizando paciente:", error);
    return null;
  }
};

// Función para eliminar un paciente por su ID
export const deletePaciente = async (id) => {
  try {
    const { data, error } = await supabase
      .from("paciente")
      .delete()
      .eq("id_paciente", id);
    if (error) throw error;
    return data[0]; // Retorna el paciente eliminado
  } catch (error) {
    console.error("Error eliminando paciente:", error);
    return null;
  }
};
