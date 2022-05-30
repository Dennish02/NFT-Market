import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { setNewCoin } from "../../../redux/actions/actionNFT";

export default function ConfirmarCompra() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cantidad = localStorage.getItem("valor");

  useEffect(() => {
    dispatch(setNewCoin(cantidad));
    localStorage.removeItem("valor");
    return () => {
      navigate("/home");
    };
  }, []);

  return (
    <div className="contConfirmar">
      <h2>
        <span>NFT</span> Market
      </h2>
      <p>Your CoinLie are updated</p>
      <Link to="/home">
        <button className="buttonPrimary">Go back home</button>
      </Link>
    </div>
  );
}
