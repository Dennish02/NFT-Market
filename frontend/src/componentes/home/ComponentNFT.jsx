import React from "react";
import { comprarNFT, AñadirFav, eliminarFav } from "../../../redux/actions/actionNFT";
import formateoPrecio from "../../middleware/formateoPrecio";
import pocentajeAumento from "../../middleware/pocentajeAumento";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import favOn from '../../img/likeOn.png';
import favOf from '../../img/likeOff.png';



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


  
 const user = useSelector(state => state.usuario)
 let idFavorito = ''
 let validarBoton = ''
 user.favoritos? validarBoton = user.favoritos : null
 user.favoritos? idFavorito = user.favoritos : null
 let extraerId = ''
 idFavorito.length>0? extraerId = idFavorito.map(el => el._id) : null
 

function añadirFavorito(){

  extraerId.includes(_id) ?

  dispatch(eliminarFav(_id)): 
  
  dispatch(AñadirFav(_id))
}
 
 
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
        
         
        <button className="w-50 buttonTrade">Trade</button>
      </div>

      {!extraerId.includes(_id) ? <img className="buttonFav" onClick={() => añadirFavorito()} src={favOf} alt="favOn"/>: <img className="buttonFav" onClick={()=> añadirFavorito()} src={favOn} alt="favOn"/>}       

    </div>
  );
}

