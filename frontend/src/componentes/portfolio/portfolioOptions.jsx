import React from "react";
import { Link } from "react-router-dom";

export default function PortfoliOptions() {
  return (
    <div>
      <div className="contButton">
        <Link to="/home/usuario/nft/crear/">
          <button className="buttonPrimary">CREAR NFT</button>
        </Link>
        <Link to="#">
          <button className="buttonOrange">CREAR COLECCION</button>
        </Link>
        <Link to="#">
          <button className="buttonMorado">MIS FAVORITOS</button>
        </Link>
      </div>

      <div className="contTittle">
        <h2 className="tuPortfolio">your portfolio</h2>

        <div>
          <select className="coleccion" name="colection" id="">
            <option value="colection">coleccion</option>
          </select>
        </div>
      </div>
    </div>
  );
}
