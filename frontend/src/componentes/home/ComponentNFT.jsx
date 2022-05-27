import React, { useState, useEffect } from "react";
import {
  comprarNFT,
  AñadirFav,
  eliminarFav,
  darLike,
  tradeOffer,
} from "../../../redux/actions/actionNFT";
import formateoPrecio from "../../middleware/formateoPrecio";
import pocentajeAumento from "../../middleware/pocentajeAumento";
import { useDispatch, useSelector } from "react-redux";

import favOn from "../../img/favOn.png";
import favOf from "../../img/favOf.png";
import likeOn from "../../img/likeOn.png";
import likeOf from "../../img/likeOff.png";
import Modal2 from "react-modal";
import Modal from "react-modal";
import ComponentNftTrade from "../../componentes/home/ComponentNftTrade";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(11,12,41,0.48)",
  },
  content: {
    margin: "0",
    padding: "0",
  },
};

export default function ComponentNFT(props) {
  const dispatch = useDispatch();
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(11,12,41,0.48)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: "380px",
    },
  };
  const {
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
  } = props;
  let porcentaje = pocentajeAumento(priceBase, price);

  //const user = useSelector(state => state.usuario)
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
  // const User = useSelector(state => state.usuarioActual)
  // if(!User) ''

  const UserFilter = usuario.nfts;

  // console.log(UserFilter);

  const [trade, setTrade] = useState({
    owner: "",
    nftId: "",
    nftOffered: "",
  });
  // console.log(trade)

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


  function MostrarModal(e) {

    setMostrarModal(true);
    setTrade({
      ...trade,
      owner: ownerId,
      nftId: id,

    })
    
    console.log(trade)
  } 


  function OcultarModal(id) {
    console.log(trade);
    if (id) {
      console.log(id);
      setTimeout(() => {
        dispatch(tradeOffer({ ...trade, nftOffered: id }));
      }, 2000);
    }
    setMostrarModal(false);
  }


  return (
    <div className="contNFT">
      <div className="contImg">
        <img src={image.url} alt="NFT IMAGE" height="280px" />
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
          {avaliable ? "En venta" : "No en venta"}
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
            <Modal2 style={customStyles} isOpen={mostrarModal}>
              <div className="padreModal">
                <div>
                  <button className="close" onClick={() => OcultarModal()}>
                    X
                  </button>
                </div>

                <div>
                  <h3>Choose the nft that you want to trade</h3>
                </div>


                <div className="contenedorCardTrade">
                  {UserFilter &&
                    UserFilter.map((nft) => (
                      <div key={nft.id}>
                        {
                          <div>
                            <div>
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
                            </div>
                          </div>
                        }
                      </div>
                    ))}
                </div>

              </div>
            </Modal2>
            <Modal isOpen={openModal} style={customStyles}>
              <div className="buyModal">
                <button className="closeButton" onClick={() => closeModal()}>
                  X
                </button>
                <div>
                  <h3>{`you wanna buy this nft for : ${price}CL?`} </h3>
                  <img src={image.url} alt="" />
                  <p>{`your balance is : ${usuario.coins}CL`}</p>
                  <p>{`your balance after buy : ${usuario.coins - price}CL`}</p>
                </div>
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
