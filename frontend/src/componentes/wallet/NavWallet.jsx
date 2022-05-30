import React, { useState } from "react";
import logo from "../../img/logo.png";
import profile from "../../img/profile.png";
import Modal from "react-modal";
import ProfileSettings from "../modalProfile/profileSettings";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const customStyls = {
  overlay: {
    backgroundColor: "rgba(11,12,41,0.48)",
  },
};

export default function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const usuario = useSelector((state) => state.usuario);

  function handleButton() {
    setShowModal(true);
  }

  function closeModal() {
    showModal && setShowModal(false);
  }

  return (
    <div className="contentNav" onClick={closeModal}>
      <Link to="/home">
        <img className="logo" src={logo} alt="Logo Perfil" />
      </Link>

      <div className="perfil">
        <p>{`Hola ${usuario.nombre}`}</p>
        {usuario.length !== 0 ? (
          <img
            src={usuario.image.url ? usuario.image.url : profile}
            alt="Profile User"
            onClick={handleButton}
            className="image-click"
          />
        ) : null}

        <Modal isOpen={showModal} className="customStyles" style={customStyls}>
          <ProfileSettings />
        </Modal>
      </div>
    </div>
  );
}
