import { supabase } from "../client.js";


// CREATE: Agregar un nuevo admin
export async function createAdmin({ email, contrasena, sede }) {
    const { data, error } = await supabase
        .from('admin')
        .insert([{ email, contrasena, sede }])
        .select()
        .single();
    if (error) throw error;
    return data;
}

// READ: Obtener todos los admins
export async function getAllAdmins() {
    const { data, error } = await supabase
        .from('admin')
        .select('*');
    if (error) throw error;
    return data;
}

// READ: Obtener un admin por ID
export async function getAdminById(id_admin) {
    const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('id_admin', id_admin)
        .single();
    if (error) throw error;
    return data;
}

// UPDATE: Actualizar un admin
export async function updateAdmin(id_admin, updates) {
    const { data, error } = await supabase
        .from('admin')
        .update(updates)
        .eq('id_admin', id_admin)
        .select()
        .single();
    if (error) throw error;
    return data;
}

// DELETE: Eliminar un admin
export async function deleteAdmin(id_admin) {
    const { error } = await supabase
        .from('admin')
        .delete()
        .eq('id_admin', id_admin);
    if (error) throw error;
    return true;
}