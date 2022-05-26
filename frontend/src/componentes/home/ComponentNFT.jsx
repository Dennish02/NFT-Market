import React, { useState } from "react";
import {
  comprarNFT,
  AñadirFav,
  eliminarFav,
  darLike,
} from "../../../redux/actions/actionNFT";
import formateoPrecio from "../../middleware/formateoPrecio";
import pocentajeAumento from "../../middleware/pocentajeAumento";
import { useDispatch } from "react-redux";

import favOn from "../../img/favOn.png";
import favOf from "../../img/favOf.png";
import likeOn from "../../img/likeOn.png";
import likeOf from "../../img/likeOff.png";



export default function ComponentNFT(props) {
  const dispatch = useDispatch();
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
  usuario.nftLikes ? ( idNftLike = usuario.nftLikes) : null;
  idNftLike.length > 0 ? nftfilter = idNftLike.map((e) => e) : null;


  const [favFlag, setFavFlag] = useState(false);
  const [likeFlag, setLikeFlag] = useState(false);

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
    confirm("Queres comprar este nft?") ? dispatch(comprarNFT(_id)) : null;
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
              onClick={() => handleBuy()}
            >
              BUY
            </button>{" "}
            <button className="w-50 buttonTrade">Trade</button>{" "}
          </>
        ) : null}
      </div>

      <div className="contLike">

    </div>
     <p className="cantlike">{`${ranking}`}</p>      
    
     

    {
      nftfilter?.includes(_id) ? (
        <img 
     className="buttonlike" 
     onClick={(e) => handleLike(e)} 
     src={likeOn} alt="likeOn" />
      ) : ( 
        <img 
     className="buttonlike" 
     onClick={(e) => handleLike(e)} 
     src={likeOf} alt="likeOf" />
      )
    }

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
