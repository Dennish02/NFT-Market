import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allNftMarket,
  allNFTUser,
  userNfts,
} from "../../redux/actions/actionNFT";
import ComponentNFT from "../componentes/home/ComponentNFT";
import NavBar from "../componentes/home/NavBar";
import SearchBar from "../componentes/home/SearchBar";

import io from "socket.io-client";
let socket;

export default function Home() {
  const dispatch = useDispatch();
  const todosLosNFT = useSelector((state) => state.allNft);
  const usuario = useSelector((state) => state.usuario);
  const params = window.location.href;

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    dispatch(allNftMarket());
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Actualizar", params);
  }, []);

  useEffect(() => {
    //recibir la respuesta del back
    socket.on("nftAgregado", () => {
      dispatch(allNftMarket());
    });
    socket.on("nftDisponile", () => {
      dispatch(allNftMarket());
      dispatch(allNFTUser());
    });
    socket.on("nftModificado", () => {
      dispatch(allNftMarket());
    });
    socket.on("nftVendido", () => {
      dispatch(allNftMarket());
      dispatch(allNFTUser());
    });
  });

  return (
    <div className="contentHome">
      <NavBar />
      <div>
        <SearchBar />
      </div>
      <main id="main" className="main">
        {todosLosNFT.length > 0 ? (
          todosLosNFT?.map((nft) => {
            if (usuario.nombre !== nft.ownerId && nft.avaliable) {
              return (
                <div key={nft.id}>
                  {
                    <ComponentNFT
                      _id={nft._id}
                      id={nft.id}
                      image={nft.image}
                      colection={nft.colection}
                      category={nft.category}
                      priceBase={nft.priceBase}
                      price={nft.price}
                      creatorId={nft.creatorId}
                      ownerId={nft.ownerId}
                      avaliable={nft.avaliable}
                    />
                  }
                </div>
              );
            }
          })
        ) : (
          <div>No hay NFT</div>
        )}
      </main>
    </div>
  );
}
