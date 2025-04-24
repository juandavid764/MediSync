import React, { useState, useEffect } from "react";

import { createPaciente } from "../supabase/crudFunctions/pacienteTable.js";
import { getAllCiudades } from "../supabase/crudFunctions/cuidadTable.js";

export const RegistroForm = ({ cambiarModo }) => {
  // Datos formulario
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

  // Estado para el feedback registro
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  // Estado para mensajes de error
  const [feedbackTel, setFeedbackTel] = useState(false);

  // variable auxiliares
  const [cuidades, setCuidades] = useState([]);
  const tipoDocOptions = [
    "Cédula de ciudadanía",
    "Cédula",
    "Pasaporte",
    "Cédula de extranjería",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    //validaciones para el registro de paciente
    switch (name) {
      case "telefono":
        // No permitir más de 10 caracteres
        if (value.length > 10) return;

        // Si el número es menor a 10 caracteres, mostrar feedback
        if (value.length < 10) {
          if (!feedbackTel) setFeedbackTel(true);
        } else {
          if (feedbackTel) setFeedbackTel(false);
        }

        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      default:
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensajeRegistro("");

    if (feedbackTel) {
      return;
    }

    const { error } = await createPaciente(formData);

    if (error) {
      setMensajeRegistro("❌ Error al registrar paciente");
    } else {
      setMensajeRegistro("✅ Paciente registrado correctamente");
      cambiarModo(); // Volver a login
    }
  };

  // Obtiene las cuidades al cargar la página
  useEffect(() => {
    getAllCiudades()
      .then((data) => {
        setCuidades(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">
        Registro de Paciente
      </h2>

      {mensajeRegistro && (
        <div className="text-center text-sm font-medium mb-4 text-blue-600">
          {mensajeRegistro}
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
            autoComplete="name"
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
            autoComplete="street-address"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Teléfono</label>
          <input
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
            autoComplete="tel"
          />
          {feedbackTel && (
            <p className="text-red-500 text-xs italic">
              Debes digitar 10 dígitos
            </p>
          )}
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
            autoComplete="bday"
            max={new Date().toISOString().split("T")[0]} // Deshabilita fechas futuras
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
            autoComplete="email"
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
            autoComplete="current-password"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Ciudad</label>
          <select
            name="cuidad"
            value={formData.cuidad}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option defaultChecked value="">
              Selecciona una ciudad
            </option>
            {cuidades.map((ciudad) => (
              <option key={ciudad.id_cuidad} value={ciudad.id_cuidad}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Tipo de Documento</label>
          <select
            name="tipo_doc"
            value={formData.tipo_doc}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option defaultChecked value="">
              Selecciona un tipo de documento
            </option>
            {tipoDocOptions.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
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
            autoComplete="off"
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
