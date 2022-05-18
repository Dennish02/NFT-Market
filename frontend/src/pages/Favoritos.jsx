import React from 'react'
import NavBar from '../componentes/home/NavBar'
import { Link } from 'react-router-dom'
import FavNFTS from '../componentes/favoritos/FavNFTS'
import { useSelector } from 'react-redux'

export default function Favoritos() {
    const miUser = useSelector(state => state.usuario)
    const favoritos = miUser.favoritos
    const prueba = favoritos.map(el => el.image.url)
    console.log('soy favoritos', prueba)
    return (
        <div><h1>favoritos</h1>
            <NavBar />
            {favoritos.length > 0 ? favoritos.map(fav => {
                return (
                    <FavNFTS image={fav.image} id={fav.id} 
                    colection={fav.colection} avaliable={fav.avaliable}
                    creatorId={fav.creatorId} ownerId={fav.ownerId}
                    />
                )
            })




                : <p>no hay favoritos </p>

            }

            <h1>Favorites </h1>

            {/* ACA SE TIENEN QUE RENDERIZAR LOS NFT QUE ESTEN AGREGADOS A FAVORITOS  */}
            <Link to='/home/usuario/portfolio'> <button>VOLVER AL PORTFOLIO </button></Link>

        </div>
    )
}
