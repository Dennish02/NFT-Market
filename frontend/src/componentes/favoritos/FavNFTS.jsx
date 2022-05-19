import React from 'react'
import { useDispatch } from 'react-redux'
import {eliminarFav} from '../../../redux/actions/actionNFT'

function    FavnFTS({id, image, _id, colection, avaliable, priceBase, price, creatorId,ownerId}) {
  const dispatch = useDispatch()
  function deleteFav(){
    dispatch(eliminarFav(_id))
    alert('favorito eliminado')
  }
  return (
    <div className="contNFT">
      <img className='contImg' src={image.url} alt="not image"  />
      <div className="contNFTinfo">
      <h2>{`${colection} ${id}`}</h2>
      <p>{`creator: ${creatorId}`}</p>
      <p>
          {" "}
          owner: <small> {ownerId}</small>{" "}
        </p>

        <p>{avaliable ? "En venta" : "No en venta"}</p>
        <button onClick={() => deleteFav()}>ELIMINAR DE FAVORITOS</button>
      </div>
    </div>
  )
}

export default FavnFTS