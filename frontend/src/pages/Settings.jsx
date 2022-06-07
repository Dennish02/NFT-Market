import React, { useEffect } from "react";
import NavBar from "../componentes/home/NavBar";
import profile from "../img/profile.png";
import { Link } from "react-router-dom";
import { cambiarImagen, usuarioActual } from "../../redux/actions/actionUSER";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import NotificationModal from "../componentes/home/NotificationModal";
let socket;

function Settings() {
  const dispatch = useDispatch();
  const params = window.location.href;
  const usuarioAct = useSelector((state) => state.usuarioActual);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Settings", params);
  }, []);

  useEffect(() => {
    dispatch(usuarioActual());
    //recibir la respuesta del back
    socket.on("nftUser2", () => {
      dispatch(usuarioActual());
    });
   
  }, []);

  function handleImage(image) {
    dispatch(cambiarImagen(image));
  }
  return (
    usuarioAct.length !== 0 ? 
    <div className="contSettings">
      {usuarioAct ?  <NavBar usuario={usuarioAct} /> : null}
     
      <NotificationModal usuario={usuarioAct} />
      <div className="contSettings-info">
        <div className="contProfile">
          <img
            src={usuarioAct?.image.url ? usuarioAct?.image.url : profile}
            alt=""
          />
          <div className="contFile">
            <label className="labelmiinput" htmlFor="mifile">
              Change image
            </label>
            <input
              type="file"
              name="image"
              className="file"
              id="mifile"
              onChange={(e) => handleImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="enlace">
          <Link to="/update-password">
            <button>Change password</button>
          </Link>
        </div>
      </div>
    </div>: <p className="MensajeVacios">Loading</p>
  );
}

export default Settings;
