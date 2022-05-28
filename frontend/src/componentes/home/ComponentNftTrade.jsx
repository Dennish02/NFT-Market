import React from "react";
import formateoPrecio from "../../middleware/formateoPrecio";
import likeOf from "../../img/likeOff.png";


function ComponentNftTrade({

    _id,
    id,
    image,
    colection,
    priceBase,
    price,
    creatorId,
    ownerId,
    usuario,
    ranking,
    trade,
    OcultarModal,

}) {

  const handleTrade = () => {
    // setnftOffered(id);
    OcultarModal(id);
  };


  return (
    <div className="contNFT">
      <div className="contImg">
        <img src={image.url} alt="NFT IMAGE" height="280px" />
      </div>

      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>usuario: {`${usuario}`}</p>
      </div>

      <div className="contNFTinfo">
        <p>id: {`${id}`}</p>
        <p>creator: {`${creatorId}`}</p>
      </div>

      <div>
        <p>priceBase: {priceBase}</p>
        <p className="contPrice">
          price: <span> {formateoPrecio(price)}</span>
        </p>
      </div>

      <div>
        <p>
          ranking: <small> {ranking}</small>
        </p>
      </div>
      <button onClick={handleTrade} className="buttonTrade1">
        Trade
      </button>

      <div className="contLike"></div>
      <p className="cantlike">{`${ranking}`}</p>

      {<img className="buttonlike" src={likeOf} alt="likeOf" />}
    </div>
  );
}

export default ComponentNftTrade;
