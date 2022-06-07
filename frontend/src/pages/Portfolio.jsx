import React, { useEffect } from "react";
import NavBar from "../componentes/home/NavBar";
import UserNFT from "../componentes/portfolio/UserNFT";
import OptionsPortfolio from "../componentes/portfolio/portfolioOptions";
import { useDispatch, useSelector } from "react-redux";
import { allNFTUser } from "../../redux/actions/actionNFT";
import { coleccionesUsuario } from "../../redux/actions/actionColeccion";

import io from "socket.io-client";
import { showUsers, usuarioActual } from "../../redux/actions/actionUSER";
import NotificationModal from "../componentes/home/NotificationModal";
let socket;

export default function Portfolio() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);
  const usuarioAct = useSelector((state) => state.usuarioActual);
  const usuarios = useSelector((state) => state.usersInfo);
  const nftUser = useSelector((state) => state.nftUser);
  const params = window.location.href;

  useEffect(() => {
    dispatch(allNFTUser());
    dispatch(showUsers());
    dispatch(usuarioActual());
    dispatch(coleccionesUsuario());
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Portfolio", params);
  }, []);

  useEffect(() => {
    //recibir la respuesta del back
    socket.on("nftUser", () => {
      dispatch(allNFTUser());
    });
    socket.on("colectionUser", () => {
      dispatch(coleccionesUsuario());
    });
  }, []);

  useEffect(() => {
  }, [nftUser]);

  return (
    usuarioAct.length !== 0 ?
    <div className="contentHome">
      <NavBar usuario={usuarioAct} />
      <NotificationModal usuario={usuarioAct} />
      <OptionsPortfolio />
      <div className="main">
        {nftUser.length > 0 ? (
          nftUser.map((el) => {
            return (
              <UserNFT
                usuarios={usuarios}
                miUser={usuario}
                key={el.id}
                id={el.id}
                _id={el._id}
                image={el.image}
                colection={el.colection}
                category={el.category}
                price={el.price}
                creatorId={el.creatorId}
                ownerId={el.ownerId}
                avaliable={el.avaliable}
              />
            );
          })
        ) : (
          <h3 className="MensajeVacios">There aren't NFTs</h3>
        )}
      </div>
    </div> : <p className="MensajeVacios">Loading</p>
  );
}
