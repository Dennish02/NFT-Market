import React from "react";
import formateoPrecio from "../../middleware/formateoPrecio";

export default function ComponentNFT(props) {
  const { id, image, colection, price,priceBase, creatorId, ownerId } = props;
 
  return (
    <div className="contNFT">
      <div className="contImg">
      <img src={image.url} alt="NFT IMAGE" height='280px' />
      </div>
      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p>owner: <small> {ownerId}</small></p>
        <div className="contPrice"><p>price:</p>  <span> {formateoPrecio(price)}</span></div>
      </div>
      <div className="contButtons">
        <button className="w-50 buttonPrimary">EDITAR</button>
        <button className="w-50 buttonTrade">REGALAR</button>
      </div>
    </div>
  );
}
