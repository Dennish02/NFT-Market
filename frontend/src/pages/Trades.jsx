import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seeOffers } from "../../redux/actions/actionNFT";
import CardTrade from "../componentes/trades/CardTrade";
import NavBar from "../componentes/home/NavBar";
import { usuarioActual } from "../../redux/actions/actionUSER";
import NotificationModal from "../componentes/home/NotificationModal";

function Trades() {
  const dispatch = useDispatch();
  let array = []
  const AllTrades = useSelector((state) => state.trades);
  const usuarioAct = useSelector((state) => state.usuarioActual);

  useEffect(() => {
    dispatch(seeOffers());
    dispatch(usuarioActual())
  }, []);

//   const handleAccept = (e) => {
//     e.preventDefault();
//   };

 
 
  if (!usuarioAct) "cargando";
  return (
    <div>
      <NavBar usuario={usuarioAct} />
      <NotificationModal usuario={usuarioAct}/>
      <div className="contenedorCard">
        {!AllTrades.msg ? (
            AllTrades?.map((e) => {
            return (
             ( <div className="contTrades">
              <h3> this user {e.userA} sent you this offer</h3>
                <div className="contTrades-cards" key={e.id}>
              
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
                  <div className="contTrades-flechas">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-big-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#f28b12" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-big-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#f28b12" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
                    </svg>
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
            {e.userB === usuarioAct.nombre ? 
              <div className="contButtonTrade">
              <button className="buttonPrimary">acept</button>
              <button className="buttonRojos">reject</button>
            </div>:
              <div className="contButtonTrade">
              
              <button className="buttonRojos">cancel</button>
            </div>}
          
            </div>
              ) 

                
            )}
  )) : <div><p>{AllTrades.msg}</p></div>} 
    </div>
  </div>
  
) 
}


export default Trades;
