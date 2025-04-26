import React, { useState } from "react";
import { validarUsuario } from "../../supabase/nativeQuerys.js";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ cambiarModo }) => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
  
    const data = await validarUsuario(email, contrasena);
  
    if (!data) {
      setMensaje("❌ Usuario o contraseña incorrectos");
      return;
    }
  
    login(data);
    navigate("/profile");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

      {mensaje && (
        <div className="text-center text-sm font-medium mb-4 text-blue-600">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="contrasena" className="block mb-1 font-medium">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg"
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={!email || !contrasena}
        >
          Ingresar
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <button className="text-blue-600 underline" id="registro" onClick={cambiarModo}>
          Regístrate
        </button>
      </div>
    </>
  );
};