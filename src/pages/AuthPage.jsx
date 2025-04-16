import { useState } from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { RegistroForm } from "../components/RegistroForm/RegistroForm";


export const AuthPage = () => {
  const [modo, setModo] = useState("login");

  const cambiarModo = () => {
    setModo(modo === "login" ? "registro" : "login");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg">
      {modo === "login" ? (
        <LoginForm cambiarModo={cambiarModo} />
      ) : (
        <RegistroForm cambiarModo={cambiarModo} />
      )}
    </div>
  );
};

export default AuthPage;
