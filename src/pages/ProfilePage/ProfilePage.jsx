import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";

import { getMedicoById } from "../../supabase/crudFunctions/medicoTable.js";
import { getPacienteById } from "../../supabase/crudFunctions/pacienteTable.js";

import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {

  const navigate = useNavigate();

  //variables de estado para el perfil
  const { user, logout } = useUser(); // Obtener el usuario del contexto
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      logout();
      navigate("/login"); // Ajusta la ruta según tu configuración
    }
  };

  // Efecto para obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      let data;

      if (user.tipo_usuario === "paciente") {
        data = await getPacienteById(user.id);
      } else if (user.tipo_usuario === "medico") {
        data = await getMedicoById(user.id);
      }

      setUserData(data);
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Cargando tu perfil...
          </p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No se encontraron datos
          </h2>
          <p className="text-gray-600">
            No pudimos cargar la información de tu perfil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Perfil de{" "}
            {user.tipo_usuario === "medico"
              ? "Médico"
              : user.tipo_usuario === "paciente"
              ? "Paciente"
              : "Administrador"}
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Gestiona tu información personal y profesional
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 p-6">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">
                  {userData.nombre} {userData.apellido || ""}
                </h2>
                <p className="text-blue-100">
                  {user.tipo_usuario === "medico"
                    ? userData.especialidad
                    : user.tipo_usuario === "paciente"
                    ? "Paciente"
                    : "Administrador"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 divide-y divide-gray-200">
            {user.tipo_usuario === "paciente" && (
              <>
                <div className="py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Nombre completo
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.nombre}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Fecha de nacimiento
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.fecha_nac}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Dirección
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.direccion}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Teléfono
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.telefono}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Información de Contacto
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Correo electrónico
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {user.tipo_usuario === "medico" && (
              <>
                <div className="py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Información Profesional
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Nombre completo
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.nombre} {userData.apellido}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Especialidad
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.especialidad}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Fecha de nacimiento
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.fecha_nac}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Teléfono
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.telefono}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Información de Contacto
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Correo electrónico
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {user.tipo_usuario === "admin" && (
              <div className="py-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Información de Administrador
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Correo electrónico
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sede</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {userData.sede}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            {/* Agrega este botón */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
