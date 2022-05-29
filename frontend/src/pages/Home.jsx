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
import {
  getValuePortfolio,
  searchNotification,
  topPortfolios,
  usuarioActual,
} from "../../redux/actions/actionUSER";
let socket;
import { guardarPagina } from "../../redux/actions/actionPaginado";
import NotificationModal from "../componentes/home/NotificationModal";
import Chat from "../componentes/home/Chat";

export default function Home() {
  const dispatch = useDispatch();
  const todosLosNFT = useSelector((state) => state.allNft);
  const usuario = useSelector((state) => state.usuario);
  const usuarioAct = useSelector((state) => state.usuarioActual);
  const nftUser = useSelector((state) => state.nftUser);
  const params = window.location.href;
  const ranking = useSelector((state) => state.ranking);
  //const token = localStorage.getItem("token");

  // const [orden, setOrden] = useState('')
  const [selectedSort, setSelectedSort] = useState("sort");
  const [orderPop, setOrderPop] = useState("");

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [nftByPage, setNftByPage] = useState(8);
  const indexOfLastNft = currentPage * nftByPage;
  const indexOfFirstNft = indexOfLastNft - nftByPage;
  let currentNft = todosLosNFT.filter(
    (e) => e.avaliable === true && usuario.nombre !== e.ownerId
  );
  let currentNftFilter = currentNft.slice(indexOfFirstNft, indexOfLastNft);
  const [screen, setScreen] = useState(window.innerWidth);
  const  mensajes = document.querySelector('#ulChat')  
  const paginas = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
   
    dispatch(usuarioActual());
    dispatch(topPortfolios());
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    dispatch(getValuePortfolio());
    dispatch(allNftMarket());
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Actualizar", params);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(usuarioActual());
  }, [todosLosNFT]);

  const test = todosLosNFT.map((el) => el.ranking);

  useEffect(() => {
    //recibir la respuesta del back
    socket.on("homeUpdate", () => {
      dispatch(allNftMarket(1));
      dispatch(usuarioActual());
      dispatch(allNFTUser());
      dispatch(topPortfolios());
      dispatch(getValuePortfolio());
      dispatch(searchNotification());
    });
  }, []);

  if (!usuarioAct) "Loading";
  return (
    <div className="contentHome">
      <NavBar usuario={usuarioAct} />
      <NotificationModal usuario={usuarioAct} />
      <div>
        <SearchBar
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          paginas={paginas}
          OrderPop={setOrderPop}
        />
      </div>
      <Paginado
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        paginas={paginas}
        currentPage={currentPage}
        allElemtns={currentNft.length}
        elementsByPage={nftByPage}
      />
      <main id="main" className="main">
        {currentNftFilter.length !== 0 ? (
          currentNftFilter?.map((nft) => {
            if (usuarioAct.nombre !== nft.ownerId && nft.avaliable) {
              return (
                <div key={nft._id}>
                  {
                    <ComponentNFT
                      screen={screen}
                      todosLosNFT={todosLosNFT}
                      usuario={usuarioAct}
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
                      ranking={nft.ranking}
                    />
                  }
                </div>
              );
            }
          })
        ) : (
          <div>
            <h3 className="textGray">There aren't NFTs on sale</h3>
          </div>
        )}
      </main>

      {usuario ? (
        <TopPortfolios ranking={ranking} screen={screen} usuario={usuario} />
      ) : (
        <p>Aweit</p>
      )}
{socket ? 

   <div className="contChat">
     <Chat usuario={usuario} socket={socket}/>
   </div> : ''}
    </div>
  );
}
