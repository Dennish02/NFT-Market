import React, { useEffect, useState } from "react";
import logo from "../../img/logo.png";
import profile from "../../img/profile.png";
import bell1 from "../../img/bell1.png";
import bell2 from "../../img/bell2.png";
import Modal from "react-modal";
import ProfileSettings from "../modalProfile/profileSettings";
import formateoPrecio from "../../middleware/formateoPrecio";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationModal from "./NotificationModal";
import { searchNotification } from "../../../redux/actions/actionUSER";

const customStyls = {
  overlay: {
    backgroundColor: "rgba(11,12,41,0.48)",
  },
};
export default function NavBar({ usuario }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalNotification, setShowModalNotification] = useState(false);
  useEffect(() => {
    dispatch(searchNotification());
  }, []);
  const notification = useSelector((state) => state.notification);

  let noti = 0;
  notification?.map((e) => (!e.visto ? noti++ : null));

  function handleButton() {
    setShowModal(true);
  }

  function formatoMoneda(coins) {
    let monedas = coins.toString();
    let monedas2 = "";
    if (monedas.length < 4) return monedas;
    if (monedas.length === 4) {
      if (monedas[1] === "0") return `${monedas[0]}K`;
      else return `${monedas[0]}.${monedas[1]}K`;
    }
    if (monedas.length < 7) {
      let medio = monedas.length / 2;
      for (let i = 0; i < monedas.length; i++) {
        if (i === Math.floor(medio)) {
          if (monedas[i] === "0") {
            break;
          } else {
            monedas2 += `.${monedas[i]}`;
            break;
          }
        }
        monedas2 += monedas[i];
      }
      monedas2 += "K";
      return monedas2;
    } else {
      let end = monedas.length === 7 ? 1 : monedas.length === 8 ? 2 : 3;
      for (let i = 0; i < end; i++) {
        monedas2 += monedas[i];
      }
      if (monedas[monedas2.length] !== "0")
        monedas2 += `.${monedas[monedas2.length]}`;

      monedas2 += "M";
      return monedas2;
    }
  }

  if (!notification) " ";

  function viewNoti() {
    let noti = document.querySelector("#contNotification");
    if (noti.className.match(/(?:^|\s)displayNone(?!\S)/)) {
      noti.classList.remove("displayNone");
      noti.classList.add("displayBlock");
    } else {
      noti.classList.remove("displayBlock");
      noti.classList.add("displayNone");
    }
  }

  function closeModal() {
    showModalNotification && setShowModalNotification(false);
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
            <span className="iconBalance">
              {formateoPrecio(formatoMoneda(usuario.coins))}
            </span>
          ) : null}
        </div>
        <p>{`¡Hi ${usuario.nombre}!`}</p>
        {noti === 0 ? (
          <div onClick={viewNoti} className="contBell">
            <img src={bell2} className="bell" alt="bell" />
          </div>
        ) : (
          <div onClick={viewNoti} className="contBell">
            <p className="contBell-text">
              {noti > 10 ? <small>9+</small> : noti}
            </p>
            <img src={bell1} className="bell" alt="bell" />
          </div>
        )}

        {usuario.length !== 0 ? (
          <div className="image-click">
            <img
              src={usuario.image.url ? usuario.image.url : profile}
              alt="Profile User"
              onClick={handleButton}
            />
          </div>
        ) : null}
        <Modal style={customStyls} isOpen={showModal} className="customStyles">
          <ProfileSettings />
        </Modal>
      </div>
    </div>
  );
}
