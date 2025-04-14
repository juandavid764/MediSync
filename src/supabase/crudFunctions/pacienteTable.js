import { supabase } from "../client.js";

export const getPacientes = async () => {
  const { data, error } = await supabase.from("paciente").select("*");
  if (error) {
    console.error("Error fetching pacientes:", error);
    return null;
  }
  return data;
};

export const getPacienteById = async (id) => {
  const { data, error } = await supabase
    .from("paciente")
    .select("*")
    .eq("id_paciente", id)
    .single;
  if (error) {
    console.error("Error fetching paciente by ID:", error);
    return null;
  }
  return data[0]; // Assuming ID is unique, return the first result
};

export const createPaciente = async (paciente) => {
  const { data, error } = await supabase.from("paciente").insert([paciente]);
  if (error) {
    console.error("Error creating paciente:", error);
    return null;
  }
  return data[0]; // Return the created paciente
};

export const updatePaciente = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("paciente")
    .update(updatedData)
    .eq("id_paciente", id);
  if (error) {
    console.error("Error updating paciente:", error);
    return null;
  }
  return data[0]; // Return the updated paciente
};

export const deletePaciente = async (id) => {
  const { data, error } = await supabase.from("paciente").delete().eq("id_paciente", id);
  if (error) {
    console.error("Error deleting paciente:", error);
    return null;
  }
  return data[0]; // Return the deleted paciente
};
