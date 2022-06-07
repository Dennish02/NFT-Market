import React, { useState} from "react";
import {
  comprarNFT,
  AñadirFav,
  eliminarFav,
  darLike,
  tradeOffer,
} from "../../../redux/actions/actionNFT";
import formateoPrecio from "../../middleware/formateoPrecio";
import pocentajeAumento from "../../middleware/pocentajeAumento";
import { useDispatch} from "react-redux";

import favOn from "../../img/favOn.png";
import favOf from "../../img/favOf.png";
import likeOn from "../../img/likeOn.png";
import likeOf from "../../img/likeOff.png";
import Modal2 from "react-modal";
import Modal from "react-modal";
import ComponentNftTrade from "../../componentes/home/ComponentNftTrade";
import { Swiper, SwiperSlide } from "swiper/react";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(11,12,41,0.48)",
  },
};

export default function ComponentNFT(props) {
  const dispatch = useDispatch();

  const {
    category,
    _id,
    id,
    image,
    colection,
    avaliable,
    priceBase,
    price,
    creatorId,
    ownerId,
    usuario,
    ranking,
    screen,
  } = props;
  let porcentaje = pocentajeAumento(priceBase, price);
  if (!usuario) "cargando";

  let idFavorito = "";
  let validarBoton = "";
  usuario.favoritos ? (validarBoton = usuario.favoritos) : null;
  usuario.favoritos ? (idFavorito = usuario.favoritos) : null;
  let extraerId = "";
  idFavorito ? (extraerId = idFavorito.map((el) => el._id)) : null;
  let nftfilter;
  let idNftLike = "";
  let validarBoton2 = "";
  usuario.nftLikes ? (validarBoton2 = usuario.nftLikes) : null;
  usuario.nftLikes ? (idNftLike = usuario.nftLikes) : null;
  idNftLike.length > 0 ? (nftfilter = idNftLike.map((e) => e)) : null;
  const [openModal, setOpenModal] = useState(false);
  const [favFlag, setFavFlag] = useState(false);
  const [likeFlag, setLikeFlag] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const UserFilter = usuario.nfts;
  const [trade, setTrade] = useState({
    owner: "",
    nftId: "",
    nftOffered: "",
  });
  function showModal() {
    setOpenModal(true);
  }
  function closeModal() {
    setOpenModal(false);
  }

  function añadirFavorito() {
    if (!favFlag) {
      setFavFlag(true);
      extraerId.includes(_id)
        ? dispatch(eliminarFav(_id))
        : dispatch(AñadirFav(_id));
      setTimeout(() => {
        setFavFlag(false);
      }, 2500);
    }
  }

  function handleLike() {
    if (!likeFlag) {
      setLikeFlag(true);
      dispatch(darLike(_id));
      setTimeout(() => {
        setLikeFlag(false);
      }, 2500);
    }
  }
  function handleBuy() {
    dispatch(comprarNFT(_id));
    setOpenModal(false);
  }

  function MostrarModal() {
    setMostrarModal(true);
    setTrade({
      ...trade,
      owner: ownerId,
      nftId: id,
    });

  }

  function OcultarModal(id) {
    if (id) {
      setTimeout(() => {
        dispatch(tradeOffer({ ...trade, nftOffered: id }));
      }, 2000);
    }
    setMostrarModal(false);
  }
  return (
    <div className="contNFT">
      <div  className= 'contImg'>
        {category === '+18' ? 
        <button onClick={(e)=>e.target.className = 'oculto'} className="viewSensible">show sensitive content</button>
         : null}
      
        <img id="imgSensitive" src={image.url} alt="NFT IMAGE" height="280px" />
      </div>

      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p>
          {" "}
          owner: <small> {ownerId}</small>{" "}
        </p>
        <p className="contPrice">
          last-price: <small> {formateoPrecio(priceBase)}</small>
        </p>
        <p>
          cotization:{" "}
          {porcentaje >= 0 ? (
            <small className="porcentajeMas">+ {porcentaje}</small>
          ) : (
            <small className="porcentajeMenos"> {porcentaje}</small>
          )}{" "}
        </p>
        <p className="contPrice">
          price: <span> {formateoPrecio(price)}</span>
        </p>
      </div>
      <div>
        <p className={avaliable ? "verde" : "rojo"}>
          {avaliable ? "On sale" : "Not for sale"}
        </p>
      </div>
      <div className="contButtons">
        {ownerId !== usuario.nombre ? (
          <>
            {" "}
            <button
              disabled={avaliable === false ? true : false}
              className={avaliable ? "w-50 buttonPrimary" : "disabled"}
              onClick={() => showModal()}
            >
              BUY
            </button>{" "}
            <button
              onClick={(e) => MostrarModal(e)}
              className="w-50 buttonTrade"
            >
              Trade
            </button>
            <Modal2
              style={customStyles}
              className="modalTrade"
              isOpen={mostrarModal}
            >
              <div>
                <div>
                  <button className="cerrar" onClick={() => OcultarModal()}>
                    X
                  </button>
                </div>

                <h3 className="subtituloTrade">
                  Choose the nft that you want to trade
                </h3>

                <div className="contenedorCardTrade">
                  <Swiper
                    slidesPerView={
                      screen > 1650
                        ? 4
                        : screen > 1300
                        ? 3
                        : screen > 920
                        ? 2
                        : 1
                    }
                    spaceBetween={30}
                    navigation
                  >
                    {UserFilter &&
                      UserFilter.map((nft, i) => (
                        <div key={nft.id}>
                          {
                            <SwiperSlide key={i}>
                              <ComponentNftTrade
                                OcultarModal={OcultarModal}
                                trade={trade}
                                // setnftOffered={setnftOffered}
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
                                ranking={nft.ranking}
                              />
                            </SwiperSlide>
                          }
                        </div>
                      ))}
                  </Swiper>
                </div>
              </div>
            </Modal2>
            <Modal isOpen={openModal} className="modalBuy" style={customStyles}>
              <div className="buyModal">
                <button className="closeButton" onClick={() => closeModal()}>
                  X
                </button>

                <h3 className="subtituloBuy">
                  {`you wanna buy this nft for ${price}CL?`}{" "}
                </h3>
                <div className="contImg">
                  <img src={image.url} alt="nft image" />
                </div>

                <p>{`your balance is : ${usuario.coins}CL`}</p>
                <p>{`your balance after buy : ${usuario.coins - price}CL`}</p>

                <div className="contButtons">
                  <button onClick={() => handleBuy()} className="buttonPrimary">
                    BUY
                  </button>
                  <button onClick={() => closeModal()} className="noButton">
                    {" "}
                    NO
                  </button>
                </div>
              </div>
            </Modal>
          </>
        ) : null}
      </div>

      <div className="contLike"></div>
      <p className="cantlike">{`${ranking}`}</p>

      {nftfilter?.includes(_id) ? (
        <img
          className="buttonlike"
          onClick={(e) => handleLike(e)}
          src={likeOn}
          alt="likeOn"
        />
      ) : (
        <img
          className="buttonlike"
          onClick={(e) => handleLike(e)}
          src={likeOf}
          alt="likeOf"
        />
      )}

      {!extraerId.includes(_id) ? (
        <img
          className="buttonFav"
          onClick={() => añadirFavorito()}
          src={favOf}
          alt="favOn"
        />
      ) : (
        <img
          className="buttonFav"
          onClick={() => añadirFavorito()}
          src={favOn}
          alt="favOn"
        />
      )}
    </div>
  );
}
