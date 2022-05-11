import React from 'react'

export default function PortfoliOptions() {
  return (
    <div  >
      <div className='contButton'>
      <button className='portfolioCreateNft'>CREAR NFT</button>
    <button className='portfolioCreateColection'>CREAR COLECCION</button>
    <button className='portfolioFavoritos'>MIS FAVORITOS</button>
      </div>
    
    <div className='contTittle'>
        
        <h2 className='tuPortfolio'>your portfolio</h2> 

        <div>
        <select className='coleccion' name="colection" id="">
        <option value="colection">coleccion</option>
        </select>
        </div>
        
    </div>

    </div>


  
  )
}
