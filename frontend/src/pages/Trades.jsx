import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seeOffers } from "../../redux/actions/actionNFT";
import CardTrade from "../componentes/trades/CardTrade";
import NavBar from "../componentes/home/NavBar";
import { usuarioActual } from "../../redux/actions/actionUSER";

function Trades() {
  const dispatch = useDispatch();
  let array = [];
  const AllTrades = useSelector((state) => state.trades);
  const usuarioAct = useSelector((state) => state.usuarioActual);

  useEffect(() => {
    dispatch(seeOffers());
    dispatch(usuarioActual());
  }, []);

  //   const handleAccept = (e) => {
  //     e.preventDefault();
  //   };

  if (!usuarioAct) "cargando";
  return (
    <div>
      <NavBar usuario={usuarioAct} />
      <div className="contenedorCard">
        {!AllTrades.msg ? (
          AllTrades.map((e) => {
            return (
              <div key={e.id}>
                <div>
                  <CardTrade
                    id={e.nftA.id}
                    creatorId={e.nftA.creatorId}
                    image={e.nftA.image.url}
                    colection={e.nftA.colection}
                    price={e.nftA.price}
                    ranking={e.nftA.ranking}
                  />
                </div>

                <div>
                  <CardTrade
                    id={e.nftB.id}
                    creatorId={e.nftB.creatorId}
                    image={e.nftB.image.url}
                    colection={e.nftB.colection}
                    price={e.nftB.price}
                    ranking={e.nftB.ranking}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>{AllTrades.msg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Trades;

{
  /* <>{AllTrades && AllTrades.map((e) => (
    <div >
         <div key={e.id} className="contenedorCard">

            <div>
                <CardTrade
                userSend= {e.userSend}
                userReceived= {e.userReceived}
                id={e.nftReceived.id}
                creatorId={e.nftReceived.creatorId}
                ownerId= {e.nftReceived.ownerId}
                image={e.nftReceived.image.url}
                colection= {e.nftReceived.colection}
                category={e.nftReceived.category}
                price= {e.nftReceived.price}
                ranking= {e.nftReceived.ranking}

                />
            </div>

            <div>
                          
                <CardTrade
                userSend= {e.userSend}
                userReceived= {e.userReceived}
                id={e.nftSend.id}
                creatorId={e.nftSend.creatorId}
                ownerId= {e.nftSend.ownerId}
                image={e.nftSend.image.url}
                colection= {e.nftSend.colection}
                category={e.nftSend.category}
                price= {e.nftSend.price}
                ranking= {e.nftSend.ranking}

                />
            </div>
            <button onClick={handleAccept} className='buttonAccept'>accept</button>
            <button className='buttonReject'>reject</button>
        </div>
    </div>
))}
</> */
}
