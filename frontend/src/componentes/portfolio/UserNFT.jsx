import React from "react";

export default function ComponentNFT(props) {
  const { id, image, colection, category, price, creatorId, ownerId } = props;

  return (
    <div className="contNFT">
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
