import React from 'react'
import img from '../../img/nft.png'


export default function ComponentNFT(props) {
    const { id, image, colection, category ,price, creatorId , ownerId} = props
   // let imagen = {`../../img/${image}.png`}
    
  return (

    <div className='contNFT'>
      <img src={img} alt='NFT IMAGE' />
      <div className='contNFTinfo'>
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p> owner: <small> {ownerId}</small></p>
        <p> price: <span> {`${price} CL`}</span> </p>
      </div>
      <div className='contButtons'>
        <button className='w-50 buttonPrimary'>BUY</button>
        <button className='w-50 buttonTrade'>Trade</button>
      </div>

    </div>
  )
}
