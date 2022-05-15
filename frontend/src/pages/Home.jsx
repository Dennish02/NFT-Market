import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allNftMarket } from "../../redux/actions/actionNFT";
import ComponentNFT from "../componentes/home/ComponentNFT";
import NavBar from "../componentes/home/NavBar";
import SearchBar from "../componentes/home/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const todosLosNFT = useSelector((state) => state.allNft);

  useEffect(() => {
    dispatch(allNftMarket());
  }, [dispatch]);

  return (
    <div className="contentHome">
      <NavBar />
      <div>
        <SearchBar />
      </div>
      <main className="main">
        {todosLosNFT.length > 0 ? (
          todosLosNFT?.map((nft) => {
            return (
              <div key={nft.id}>
                {
                  <ComponentNFT
                    _id={nft._id}
                    id={nft.id}
                    image={nft.image}
                    colection={nft.colection}
                    category={nft.category}
                    priceBase={nft.priceBase}
                    price={nft.price}
                    creatorId={nft.creatorId}
                    ownerId={nft.ownerId}
                    avaliable={nft.avaliable}
                  />
                }
              </div>
            );
          })
        ) : (
          <div>No hay NFT</div>
        )}
      </main>
    </div>
  );
}
