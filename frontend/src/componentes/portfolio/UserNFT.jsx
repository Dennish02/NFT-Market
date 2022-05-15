import React from "react";
import { useDispatch } from "react-redux";
import { venta } from "../../../redux/actions/actionNFT";

export default function ComponentNFT(props) {
  const { id, _id, image, colection, avaliable, price, creatorId, ownerId } =
    props;
  const dispatch = useDispatch();

  function handleSell() {
    dispatch(venta(_id));
  }

  return (
    <div className="contNFT">
      <div className="venta">
        <div
          className={avaliable ? "enVenta" : "noVenta"}
          onClick={() => handleSell()}
        ></div>
      </div>
      <img src={image.url} alt="NFT IMAGE" />
      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p>
          {" "}
          owner: <small> {ownerId}</small>
        </p>
        <p>
          {" "}
          price: <span> {`${price} CL`}</span>{" "}
        </p>
      </div>
      <div className="contButtons">
        <button className="w-50 buttonPrimary">EDITAR</button>
        <button className="w-50 buttonTrade">REGALAR</button>
      </div>
    </div>
  );
}
