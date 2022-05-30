import React from "react";
import { useDispatch } from "react-redux";
import { eliminarFav } from "../../../redux/actions/actionNFT";
import formateoPrecio from "../../middleware/formateoPrecio";
import { comprarNFT } from "../../../redux/actions/actionNFT";


function FavnFTS({
  id,
  image,
  _id,
  colection,
  avaliable,
  priceBase,
  price,
  creatorId,
}) {
  const dispatch = useDispatch();
  function deleteFav() {
    dispatch(eliminarFav(_id));
  }
  function handleBuy() {
    confirm("Are you sure?") ? dispatch(comprarNFT(_id)) : null;
  }
  return (
    <div className="contNFTWallet">
      <div className="imgFav">
        <img src={image.url} alt="no image" />
      </div>
      <h2 className="second-grid">
        {`${colection} ${id}`}
        <p>{`Creator:  ${creatorId}`}</p>{" "}
      </h2>

      <div className="third-grid">
        <p className="contPrice">
          Last-price: <small> {formateoPrecio(priceBase)}</small>
        </p>
        <p className="contPrice">
          Price: <span> {formateoPrecio(price)}</span>
        </p>
      </div>


      <div className="btn-group">
        {avaliable == true ? (
          <button onClick={() => handleBuy()} className="buy-button">BUY</button>
        ) : (
          <button className="disabled">Not for sale</button>
        )}
        <button className="delete-button" onClick={() => deleteFav()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="iconFav"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#e1e1e1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="3" y1="3" x2="21" y2="21" />
            <path d="M10.012 6.016l1.981 -4.014l3.086 6.253l6.9 1l-4.421 4.304m.012 4.01l.588 3.426l-6.158 -3.245l-6.172 3.245l1.179 -6.873l-5 -4.867l6.327 -.917" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default FavnFTS;
