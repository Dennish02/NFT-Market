import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tradeOffer, seeOffers } from '../../redux/actions/actionNFT'
import CardTrade from "../componentes/trades/CardTrade"
import NavBar from "../componentes/home/NavBar"


function Trades() {

const dispatch = useDispatch()
const AllTrades = useSelector(state => state.trades)
// console.log(AllTrades)
const usuarioAct = useSelector((state) => state.usuarioActual);

useEffect(() => {
    dispatch(tradeOffer())
    dispatch(seeOffers())
},[])

if (!usuarioAct) "cargando";
  return (
    <div>
        <NavBar usuario={usuarioAct} />
        <>{AllTrades && AllTrades.map((e, i) => (
                <div key={i}>
                    {  <div className="contenedorCard">

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
                        <button className='buttonAccept'>accept</button>
                        <button className='buttonReject'>reject</button>
                    </div>}
                </div>
            ))
        }
         </>
    </div>
  )
}

export default Trades