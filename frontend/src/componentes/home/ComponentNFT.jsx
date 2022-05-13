import React from "react";
import pocentajeAumento from "../../middleware/pocentajeAumento";

export default function ComponentNFT(props) {
  const { id, image, colection, priceBase , price, creatorId, ownerId } = props;
 let porcentaje=  pocentajeAumento(priceBase, price)
  return (
    <div className="contNFT">
      <div className="contImg">
      <img src={image.url} alt="NFT IMAGE" height='280px' />
      </div>
     
      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p> owner: <small> {ownerId}</small> </p>
        <p>last-price: <small> {`${priceBase} CL`}</small></p>
        <p>cotization: {porcentaje >= 0 ? <small className="porcentajeMas">+ {porcentaje}</small>  : <small className="porcentajeMenos"> {porcentaje}</small> } </p>
        <p>price: <span> {`${price} CL`}</span></p>
      </div>
      <div className="contButtons">
        <button className="w-50 buttonPrimary">BUY</button>
        <button className="w-50 buttonTrade">Trade</button>
      </div>
    </div>
  );
}
