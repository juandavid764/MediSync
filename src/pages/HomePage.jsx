import React from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleAuthNavigation = () => {
    navigate("/authPage");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenido a MediSync</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Tu plataforma confiable para la gestión de información médica. 
        Por favor, inicia sesión o regístrate para acceder a todas nuestras funcionalidades.
      </p>
      <button
        onClick={handleAuthNavigation}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Iniciar Sesión / Registrarse
      </button>
    </div>
  );
};