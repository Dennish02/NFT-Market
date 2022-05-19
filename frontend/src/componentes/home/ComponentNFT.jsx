import React from "react";
import { comprarNFT, AñadirFav } from "../../../redux/actions/actionNFT";
import formateoPrecio from "../../middleware/formateoPrecio";
import pocentajeAumento from "../../middleware/pocentajeAumento";
import { useDispatch, useSelector } from "react-redux";

export default function ComponentNFT(props) {
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
  } = props;
  let porcentaje = pocentajeAumento(priceBase, price);
  const dispatch = useDispatch();
  function añadirFavoritos(){
    dispatch(AñadirFav(_id))
    alert('nft agregado a favoritos')
  }
 const user = useSelector(state => state.usuario)
 let idFavorito = ''
 

 
 
 
 
 
 
 

  function handleBuy() {
    confirm("Queres comprar este nft?")
      ? dispatch(comprarNFT(_id))
      : null;
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
        <p>{avaliable ? "En venta" : "No en venta"}</p>
      </div>
      <div className="contButtons">
        <button className="w-50 buttonPrimary" onClick={() => handleBuy()}>
          BUY
        </button>
       
        {user.favoritos? (idFavorito = user.favoritos, idFavorito.map(el => el._id.includes(_id)? null : <button onClick={()=> añadirFavoritos()}>AÑADIR A FAVS</button> )) :null}
        <button className="w-50 buttonTrade">Trade</button>
      </div>
    </div>
  );
}

