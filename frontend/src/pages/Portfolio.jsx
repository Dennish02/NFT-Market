import React, { useEffect } from "react";
import NavBar from "../componentes/home/NavBar";
import UserNFT from "../componentes/portfolio/UserNFT";
import OptionsPortfolio from "../componentes/portfolio/portfolioOptions";
import { useDispatch, useSelector } from "react-redux";
import { allNFTUser, userNfts } from "../../redux/actions/actionNFT";
import { coleccionesUsuario } from "../../redux/actions/actionColeccion";

import io from "socket.io-client";
let socket;

export default function Portfolio() {
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.usuario);
  const nftUser = useSelector((state) => state.nftUser);
  const params = window.location.href;

  useEffect(() => {
    dispatch(allNFTUser());
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
  });

  return (
    <div className="contentHome">
      <NavBar />
      <OptionsPortfolio />
      <div className="main">
        {nftUser.length > 0 ? (
          nftUser.map((el) => {
            return (
              <UserNFT
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
          <p>loading</p>
        )}
      </div>
    </div>
  );
}
