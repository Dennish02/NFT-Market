import React, { useEffect, useState } from "react";
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
import TopPortfolios from "../componentes/home/TopPortfolios";
import Paginado from "./Paginas";
import { getValuePortfolio, topPortfolios } from "../../redux/actions/actionUSER";
let socket;

export default function Home() {
  const dispatch = useDispatch();
  const todosLosNFT = useSelector((state) => state.allNft);
  const usuario = useSelector((state) => state.usuario);
  const params = window.location.href;
  const token = localStorage.getItem("token");
  const [orden, setOrden] = useState('')


  //Paginado 
  const [currentPage, setCurrentPage] = useState(1);
  const [nftByPage, setNftByPage] = useState(8);
  const indexOfLastNft = currentPage * nftByPage;
  const indexOfFirstNft = indexOfLastNft - nftByPage;
  let currentNft = todosLosNFT.filter(e=>e.avaliable === true && usuario.nombre !== e.ownerId)
  let currentNftFilter = currentNft.slice(indexOfFirstNft,indexOfLastNft);
 

  const paginas = (pageNumber) => {
    //console.log(pageNumber);
    setCurrentPage(pageNumber);
  };
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
 
  useEffect(() => {
    dispatch(getValuePortfolio())
    dispatch(allNftMarket());
    
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Actualizar", params);
  }, []);

  useEffect(() => {
    //recibir la respuesta del back
    socket.on("homeUpdate", () => {
      dispatch(allNftMarket());
       dispatch(allNFTUser());
    });
  });

  return (
    <div className="contentHome">
      <NavBar usuario={usuario} />
      <div>
        <SearchBar setOrden={setOrden}/>
      </div>
      <main id="main" className="main">
        {currentNftFilter.length !== 0 ? (
          currentNftFilter?.map((nft) => {
            if (usuario.nombre !== nft.ownerId && nft.avaliable) {
              return (
                <div key={nft.id}>
                  {
                    <ComponentNFT
                    usuario={usuario.nombre}
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
      <Paginado
             goToNextPage={goToNextPage}
             goToPreviousPage={goToPreviousPage}
             paginas={paginas}
             currentPage={currentPage}
             allElemtns={currentNft.length}
             elementsByPage={nftByPage}
        />
     { usuario ? 
        <TopPortfolios usuario={usuario} /> : <p>Aweit</p>
     }
    </div>
  );
}
