import React from 'react'
import { useDispatch } from 'react-redux'
import {eliminarFav} from '../../../redux/actions/actionNFT'
import formateoPrecio from '../../middleware/formateoPrecio'
import pocentajeAumento from '../../middleware/pocentajeAumento'
import {comprarNFT} from '../../../redux/actions/actionNFT'
function    FavnFTS({id, image, _id, colection, avaliable, priceBase, price, creatorId,ownerId}) {
  const dispatch = useDispatch()
  function deleteFav(){
    dispatch(eliminarFav(_id))
    alert('favorito eliminado')
  }

  function handleBuy() {
    confirm("Estas seguro de gastar tu plata en el mono?")
      ? dispatch(comprarNFT(_id))
      : null;
  }
  let porcentaje = pocentajeAumento(priceBase, price)
  return (
    <div  >
    <div className='contentGrid'  >
    
      <img className='imagee' src={image.url} alt="not image"  />
      <p className='text' >{`creador : ${creatorId}`} </p>
      <p  className='text'>{`price: ${price}`}</p>
      <button className='last-grid' onClick={() => deleteFav()}>ELIMINAR DE FAVORITOS</button>
     
      </div>
    </div>
    
   
  )
}

export default FavnFTS