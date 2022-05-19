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
    <div className="contNFT">
      <img className='contImg' src={image.url} alt="not image"  />
      <div className="contNFTinfo">
      <h2>{`${colection} ${id}`}</h2>
      <p>{`creator: ${creatorId}`}</p>
      <p>
          {" "}
          owner: <small> {ownerId}</small>{" "}
        </p>
        <p>
          cotization:{" "}
          {porcentaje >= 0 ? (
            <small className="porcentajeMas">+ {porcentaje}</small>
          ) : (
            <small className="porcentajeMenos"> {porcentaje}</small>
          )}{" "}
        </p>
        <p className='contPrice'>
          last-price: <small>{formateoPrecio(priceBase)}</small>
        </p>
       
        <p>{avaliable ? "En venta" : "No en venta"}</p>
        <button onClick={() => deleteFav()}>ELIMINAR DE FAVORITOS</button>
        <button className="w-50 buttonPrimary" onClick={() => handleBuy()}>BUY</button>
      </div>
    </div>
  )
}

export default FavnFTS