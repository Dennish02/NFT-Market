import React from 'react'
import NavWallet from "../componentes/wallet/NavWallet"
import ComponentNFTWallet from "../componentes/wallet/ComponentNFTWallet"
import { useSelector } from "react-redux"
import formateoPrecio from "../middleware/formateoPrecio";

function Wallet() {

const usuario = useSelector(state => state.usuario)
console.log(usuario.transacciones)

  return (
    <div> 
        <NavWallet/>
        <div className='ContenedorGeneralWallet'>
        <div className="wallet-panel">
            <div className='balanceWallet'>
            <p>your balance: </p><span>{formateoPrecio(usuario.coins)}</span>
            </div>
            <div>
            <button className='buttonPrimary block' >Deposit</button>
            <button className='buttonPrimary block'>Transfer</button>
            </div>
        </div>
        <div className='ContenedorCardsWallet'>
          {usuario.transacciones?.length > 0 ? (
            usuario.transacciones?.map((nft,index) => {
              return (
                <div key={index}>
                {
                  <ComponentNFTWallet
                    NFT_colection={nft.NFT_colection}
                    NFT_id={nft.NFT_id}
                    actual_owner_Id={nft.actual_owner_Id}
                    createdAt={nft.createdAt}
                    price={nft.price}
                    seller_Id={nft.seller_Id}
                    transactionType={nft.transactionType}
                    updatedAt={nft.updatedAt}
                    __v={nft.__v}
                    _id={nft._id}
                  />
                }
              </div>
              )
            })
          ) : (
            <div>No hay transacciones aun</div>
          )
          }
        </div>
        </div>
    </div>
  )
}

export default Wallet