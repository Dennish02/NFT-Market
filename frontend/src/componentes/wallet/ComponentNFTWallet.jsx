import React, { useState, useEffect } from "react";
import formateoPrecio from "../../middleware/formateoPrecio";

function ComponentNFTWallet(props) {
  const {
    NFT_colection,
    NFT_id,
    actual_owner_Id,
    createdAt,
    price,
    seller_Id,
    transactionType,
    updatedAt,
    __v,
    _id,
  } = props;

  return (
    <div className="contNFTWallet">
      <div className="contenedorColection">
        <p>{`${NFT_colection}`}</p>
        <p>{`${NFT_id}`}</p>
      </div>

      <div>
        <p>
          owner: <small> {actual_owner_Id}</small>
        </p>
        <p className="contPrice">
          price: <span> {formateoPrecio(price)}</span>
        </p>
      </div>

      <div>
        <p>{`${seller_Id}`}</p>
        <p>
          type: <small> {transactionType}</small>
        </p>
      </div>

      <div>
        <p>
          update: <small> {updatedAt}</small>
        </p>
      </div>
    </div>
  );
}

export default ComponentNFTWallet;

// NFT_colection: "col1"
// NFT_id: "#VmG0"
// actual_owner_Id: "pollo"
// createdAt: "2022-05-15T23:55:09.398Z"
// price: 250
// seller_Id: "pablo"
// transactionType: "sale"
// updatedAt: "2022-05-15T23:55:09.398Z"
// __v: 0
// _id:
