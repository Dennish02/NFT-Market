import React from "react";
import formateoPrecio from "../../middleware/formateoPrecio";

function ComponentNFTWallet(props) {
  const {
    NFT_colection,
    NFT_id,
    actual_owner_Id,
    price,
    seller_Id,
    transactionType,
    updatedAt,
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
