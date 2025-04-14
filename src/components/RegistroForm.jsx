import React, { useState } from "react";
import { createPaciente } from "../supabase/crudFunctions/pacienteTable.js";

export const RegistroForm = ({ cambiarModo }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    fecha_nac: "",
    email: "",
    contrasena: "",
    historial: null, // Opcional
    cuidad: "",
    tipo_doc: "",
    num_doc: "",
    usuario: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje("");

    const { error } = await createPaciente(formData);

    if (error) {
      setMensaje("❌ Error al registrar paciente");
    } else {
      setMensaje("✅ Paciente registrado correctamente");
      cambiarModo(); // Volver a login
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Registro de Paciente</h2>

      {mensaje && (
        <div className="text-center text-sm font-medium mb-4 text-blue-600">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleRegistro} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Fecha de nacimiento</label>
          <input
            type="date"
            name="fecha_nac"
            value={formData.fecha_nac}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Ciudad</label>
          <input
            type="text"
            name="cuidad"
            value={formData.cuidad}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tipo de Documento</label>
          <input
            type="text"
            name="tipo_doc"
            value={formData.tipo_doc}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Número de Documento</label>
          <input
            type="text"
            name="num_doc"
            value={formData.num_doc}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <button className="text-blue-600 underline" onClick={cambiarModo}>
          Inicia sesión
        </button>
      </div>
    </>
  );
};