import React, { useEffect } from "react";
import NavBar from "../componentes/home/NavBar";
import { Link } from "react-router-dom";
import { cambiarImagen, usuarioActual } from "../../redux/actions/actionUSER";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import io from "socket.io-client";
let socket;

function Settings() {
  const dispatch = useDispatch();
  const params = window.location.href;
  const usuario = useSelector((state) => state.usuario);
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(usuarioActual());
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Settings", params);
  }, []);

  useEffect(() => {
    //recibir la respuesta del back
    socket.on("nftUser2", () => {
      dispatch(usuarioActual());
    });
  });

  function handleImage(image) {
    dispatch(cambiarImagen(image));
  }
  return (
    <div>
      <NavBar />
      <div>
        <Link to="/update-password">
          <p>-Change password</p>
        </Link>
        <input
          type="file"
          name="image"
          className="file"
          onChange={(e) => handleImage(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default Settings;
