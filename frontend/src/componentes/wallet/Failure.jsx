import React from "react";

export default function Failure() {
  return (
    <div className="contConfirmar">
      <h2>
        <span>NFT</span> Market
      </h2>
      <p>An error occurred in the purchase</p>
      <Link to="/">
        <button className="buttonOrange">Go back home</button>
      </Link>
    </div>
  );
}
