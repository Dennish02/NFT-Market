import React from 'react'

function    FavnFTS({id, image, _id, colection, avaliable, priceBase, price, creatorId,ownerId}) {
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
      </div>
    </div>
  )
}

export default FavnFTS