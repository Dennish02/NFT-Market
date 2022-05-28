import React from "react";
import formateoPrecio from "../../middleware/formateoPrecio";

function CardTrade(props) {
  const { id, creatorId, image, colection, price, ranking } = props;

  return (
    <div className="contNFT">
      <div className="contImg">
        <img src={image} alt="NFT IMAGE" height="280px" />
      </div>

      <div className="contNFTinfo">
        <p>id: {`${id}`}</p>
        <p>creator: {`${creatorId}`}</p>
      </div>

      <div>
        <p className="contPrice">
          price: <span> {formateoPrecio(price)}</span>
        </p>
      </div>

      <div>
        <p>colection: {`${colection}`}</p>
      </div>

      <div>
        <p>
          ranking: <small> {ranking}</small>
        </p>
      </div>
    </div>
  );
}

export default CardTrade;
