import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allNftMarket } from "../../redux/actions/actionNFT";
import ComponentNFT from "../componentes/home/ComponentNFT";
import NavBar from "../componentes/home/NavBar";
import SearchBar from "../componentes/home/SearchBar";


import io from 'socket.io-client';
import { useParams } from "react-router";
let socket;
  

export default function Home() {
  const dispatch = useDispatch();
  const todosLosNFT = useSelector((state) => state.allNft);
  const usuario = useSelector((state) => state.usuario);
  const params = window.location.href
 

  useEffect(() => {
    dispatch(allNftMarket());
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("Actualizar",params)
  }, []);

  useEffect(()=>{
    //recibir la respuesta del back
    socket.on('nftAgregado',(datosRecibir)=>{
      dispatch(allNftMarket());
      console.log(datosRecibir);
    })
  })

  return (
    <div className="contentHome">
      <NavBar />
      <div>
        <SearchBar />
      </div>
      <main id="main" className="main">
        {todosLosNFT.length > 0 ? (
          todosLosNFT?.map((nft) => {
            return (
              <div key={nft.id}>
                {
                  <ComponentNFT
                    id={nft.id}
                    image={nft.image}
                    colection={nft.colection}
                    category={nft.category}
                    priceBase={nft.priceBase}
                    price={nft.price}
                    creatorId={nft.creatorId}
                    ownerId={nft.ownerId}
                  />
                }
              </div>
            );
          })
        ) : (
          <div>No hay NFT</div>
        )}
      </main>
    </div>
  );
}
