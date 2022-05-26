import React, { useEffect, useState } from "react";
import logo from "../../img/logo.png";
import profile from "../../img/profile.png";
import bell1 from '../../img/bell1.png';
import bell2 from '../../img/bell2.png'
import Modal from "react-modal";
import ProfileSettings from "../modalProfile/profileSettings";
import formateoPrecio from "../../middleware/formateoPrecio";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationModal from "./NotificationModal";

const customStyles = {
    overlay :{
      backgroundColor: 'rgba(11,12,41,0.48)',
    },
};
export default function NavBar({usuario}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalNotification, setShowModalNotification] = useState(false)
  function handleButton() {
    setShowModal(true);
  }
  
  function viewNoti(){
     let noti = document.querySelector('#contNotification')
     if ( noti.className.match(/(?:^|\s)displayNone(?!\S)/) ){
      noti.classList.remove("displayNone");
      noti.classList.add("displayBlock");
     }else{
      noti.classList.remove("displayBlock");
      noti.classList.add("displayNone");
     }
  }



  function closeModal() {
    showModalNotification && setShowModalNotification(false)
    showModal && setShowModal(false);
  }

  return (
    <div className="contentNav" onClick={closeModal}>
      <Link to="/home">
        <img className="logo" src={logo} alt="Logo Perfil" />
      </Link>

      <div className="perfil">
        <div className="contBalance">
          {usuario.length !== 0 ? (
            <span className="iconBalance">{formateoPrecio(usuario.coins)}</span>
          ) : null}
        </div>
        <p>{`¡Hi ${usuario.nombre}!`}</p>
        <div onClick={viewNoti} className="contBell">
          <p className="contBell-text">5+</p>
          <img src={bell1} className='bell' alt="bell" />
        </div>
        
            
            
        {usuario.length !== 0 ? (
          <img
            src={usuario.image.url ? usuario.image.url : profile}
            alt="Profile User"
            onClick={handleButton}
            className="image-click"
          />
        ) : null}

        <Modal style={customStyles} isOpen={showModal} className='customStyles'>
          <ProfileSettings />
        </Modal>
      </div>
    </div>
  );
}
