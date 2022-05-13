import React from "react";
import { Link } from "react-router-dom";

export default function PortfoliOptions() {
  return (
    <div>
      <div className="contButton">
        <Link className="portfolioCreateNft" to="/home/usuario/nft/crear/">
          <a>CREAR NFT</a>
        </Link>
        <Link className="portfolioCreateColection" to="#">
          <a>CREAR COLECCION</a>
        </Link>
        <Link className="portfolioFavoritos" to="#">
          <a>MIS FAVORITOS</a>
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
