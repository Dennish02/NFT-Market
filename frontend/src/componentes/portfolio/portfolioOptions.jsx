import React from 'react'

export default function PortfoliOptions() {
  return (
    <div >
    <button className='portfolioCreateNft'>CREAR NFT</button>
    <button className='portfolioCreateColection'>CREAR COLECCION</button>
    <button className='portfolioFavoritos'>MIS FAVORITOS</button>
    <div>
        
        <h2 className='tuPortfolio'>your portfolio</h2> 
        <select className='coleccion' name="colection" id="">
        <option value="colection">coleccion</option>
        </select>
    </div>

    </div>


  
  )
}
