import React from 'react'
import { useDispatch } from 'react-redux'
import {eliminarFav} from '../../../redux/actions/actionNFT'
import formateoPrecio from '../../middleware/formateoPrecio'
import pocentajeAumento from '../../middleware/pocentajeAumento'
import {comprarNFT} from '../../../redux/actions/actionNFT'
import { toast } from 'react-toastify'

 

function    FavnFTS({id, image, _id, colection, avaliable, priceBase, price, creatorId,ownerId}) {
  const dispatch = useDispatch()
  function deleteFav(){
    dispatch(eliminarFav(_id))  
  }

  function handleBuy() {
    confirm("Are you sure?")
      ? dispatch(comprarNFT(_id))
      : null;
  }
  //let porcentaje = pocentajeAumento(priceBase, price)
  return (
    
    <div className='contNFTWallet'  >
      <div className='imgFav'>
      <img  src={image.url} alt="no image"  />
      </div>
      <h2 className='second-grid' >{ `${colection} ${id}`} <p>{`Creator:  ${creatorId}`}</p> </h2>
      
      <div className='third-grid'>
      <p className="contPrice">
          Last-price: <small> {formateoPrecio(priceBase)}</small>
        </p>
        <p className="contPrice">
          Price: <span> {formateoPrecio(price)}</span>
        </p>
        </div>
        
      {/* <p  className='text'>{`price: ${price}`}</p> */}
      <div className='btn-group'>
      {avaliable==true?  <button onClick={() =>handleBuy() } className='buy-button'> BUY</button> : <button className='disabled'>Not for sale</button> }
      <button  className='delete-button' onClick={() => deleteFav()}>DELETE FROM FAVS</button>
      </div>
      
     
      
    </div>
    
   
  )
}

export default FavnFTS