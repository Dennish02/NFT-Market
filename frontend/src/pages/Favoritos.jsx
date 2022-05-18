import React from 'react'
import NavBar from '../componentes/home/NavBar'
import { Link } from 'react-router-dom'
import FavNFTS from '../componentes/favoritos/FavNFTS'
export default function Favoritos() {
  return (
    <div>IM FAVORITOS
        <NavBar/>
        <FavNFTS/>
        <h1>Favorites </h1>

        {/* ACA SE TIENEN QUE RENDERIZAR LOS NFT QUE ESTEN AGREGADOS A FAVORITOS  */}
        <Link to ='/home/usuario/portfolio'> <button>VOLVER AL PORTFOLIO </button></Link>
        
    </div>
  )
}
