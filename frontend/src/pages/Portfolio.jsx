import React, { useEffect } from "react";
import NavBar from "../componentes/home/NavBar";
import UserNFT from "../componentes/portfolio/UserNFT";
import OptionsPortfolio from "../componentes/portfolio/portfolioOptions";
import { useDispatch, useSelector } from "react-redux";
import { allNFTUser, userNfts } from "../../redux/actions/actionNFT";

export default function Portfolio() {
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.usuario);
  const nftUser = useSelector((state) => state.nftUser);
 
 
  useEffect(() => {
    dispatch(allNFTUser());
  }, [nftUser]);


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
                _id={el._id}
                image={el.image}
                colection={el.colection}
                category={el.category}
                price={el.price}
                creatorId={el.creatorId}
                ownerId={el.ownerId}
                avaliable={el.avaliable}
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
