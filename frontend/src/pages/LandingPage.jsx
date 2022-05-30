import React, { useEffect } from "react";
import Carrusel from "../componentes/landing/Carrusel";
import Formulario from "../componentes/landing/Formulario";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { autenticarUser } from "../../redux/actions/actionUSER";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export default function LnadingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*Dennis: puse este useEfect para que vea si el ususario dejó la sesion activa
    ?o si cerró sesion, caso de que tenga activa
    lo redirecciona*/
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let usuarioA = dispatch(autenticarUser(config));
    usuarioA ? navigate("/home") : null;
  }, []);

  return (
    <div className="landing">
      <div className="contentbutton">
        <Link to="/login">
          <button className="buttonPrimary">LOGIN</button>
        </Link>
        <Link to="/register">
          <button className="buttonPrimary">REGISTER</button>
        </Link>
      </div>
      <div className="contLanding">
        <div className="contLandingOne">
          <Formulario />
          <Carrusel />
        </div>
      </div>
    </div>
  );
}
