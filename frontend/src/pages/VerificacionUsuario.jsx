import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { autenticarUser } from "../../redux/actions/actionUSER";

export default function VerificacionUsuario() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(autenticarUser(config));
  }, []);
  if (!token) "Loading";

  return <>{token ? <Outlet /> : <Navigate to="/" />}</>;
}
