import React from "react";
import NavBar from "../componentes/home/NavBar";
import ComponentNFT from "../componentes/home/ComponentNFT";
import UserNFT from "../componentes/portfolio/UserNFT";
import OptionsPortfolio from "../componentes/portfolio/portfolioOptions";
import { useSelector } from "react-redux";

export default function Portfolio() {
  const usuario = useSelector((state) => state.usuario);

  console.log(usuario);
  return (
    <div className="contentHome">
      <NavBar />
      <OptionsPortfolio />
      <div className="main">
        {usuario.nfts.length > 0 ? (
          usuario.nfts.map((el) => {
            return (
              <UserNFT
                key={el.id}
                id={el.id}
                image={el.image}
                colection={el.colection}
                category={el.category}
                price={el.price}
                creatorId={el.creatorId}
                ownerId={el.ownerId}
              />
            );
          })
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
}
