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
            In NFT market you can create your own NFTs, sell them, collect them,
            and interact with the NFT community. Discover the most fun and
            exclusive NFT collections.
          </p>
        </div>
        <Link to="/register">
          <button className="buttonPrimary">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
