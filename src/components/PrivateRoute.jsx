import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Valido el status", status);
    if (status !== "authenticated") {
      console.log("No estoy autenticado, redirijo a /");
      navigate("/");
    }
  }, [status, navigate]);

  if (status === "authenticated") {
    return children;
  }

  console.log("No estoy autenticado, no muestro el children", children);

  return null;
};
