import React from 'react'
import NavBar from '../componentes/home/NavBar'
import ComponentNFT from '../componentes/home/ComponentNFT'
import OptionsPortfolio from '../componentes/portfolio/portfolioOptions'
import { useSelector } from 'react-redux'

export default function Portfolio() {
  const losNFT = useSelector(state => state.allNft)
  


  return (
    <div className='contentHome'>
    <NavBar />
    <OptionsPortfolio/>
    <div className='main'>
      
      {
        losNFT.length > 0 ? losNFT.map(el => {
          return (
            <ComponentNFT
              key = {el.id}
              id={el.id}
              image={el.image}
              colection={el.colection}
              category={el.category}
              price={el.price}
              creatorId={el.creatorId}
              ownerId={el.ownerId}
            />

          )
        })

          : <p>loading</p>
      }
    </div>
    </div>
  )
}
