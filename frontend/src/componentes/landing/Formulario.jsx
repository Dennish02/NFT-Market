import React from "react";
import { Link } from "react-router-dom";

export default function Formulario() {
  return (
    <div>
      <h1 className="tituloPagina">
        {" "}
        <span>NFT</span> Martket
      </h1>
      <div className="contDescription">
        <div>
          <p>
            It is an exchange platform where you can operate with your NFTs, both sell them, buy them, give them away and exchange them with the rest of the community.
            Discover the most fun and exclusive NFT collections on the market.
          </p>
        </div>
        <Link to="/register">
          <button className="buttonPrimary">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
