import React from "react";
import formateoPrecio from "../../middleware/formateoPrecio";
import pocentajeAumento from "../../middleware/pocentajeAumento";

export default function ComponenteTopPortf(props) {
  const {
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
          {avaliable ? "On sale" : "Not for sale"}
        </p>
      </div>
    </div>
  );
}
