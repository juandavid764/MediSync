import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
         if (status !== "authenticated") {
             navigate("/");
    }
  }, [status, navigate]);

  if (status === "authenticated") {
    return children;
  }

     return null;
};
