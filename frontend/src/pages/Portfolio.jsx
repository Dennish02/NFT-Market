import React, { useEffect } from "react";
import NavBar from "../componentes/home/NavBar";
import ComponentNFT from "../componentes/home/ComponentNFT";
import UserNFT from "../componentes/portfolio/UserNFT";
import OptionsPortfolio from "../componentes/portfolio/portfolioOptions";
import { useDispatch, useSelector } from "react-redux";
import { allNftMarket, userNfts } from "../../redux/actions/actionNFT";

export default function Portfolio() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usuario);
  const nftUser = useSelector((state) => state.nftUser);
  const allNft = useSelector((state) => state.allNft);
  // console.log(user);
  // console.log(nftUser);

  useEffect(() => {
    dispatch(allNftMarket());
    dispatch(userNfts(user.nombre));
  }, [dispatch, allNft]);

  return (
    <div className="contentHome">
      <NavBar />
      <OptionsPortfolio />
      <div className="main">
        {nftUser.length > 0 ? (
          nftUser.map((el) => {
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
