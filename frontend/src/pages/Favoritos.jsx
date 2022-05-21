import React, { useEffect } from 'react'
import NavBar from '../componentes/home/NavBar'
import { Link } from 'react-router-dom'
import FavNFTS from '../componentes/favoritos/FavNFTS'
import { useDispatch, useSelector } from 'react-redux'
import { usuarioActual } from '../../redux/actions/actionUSER'

export default function Favoritos() {
    const dispatch = useDispatch()
    const miUser = useSelector(state => state.usuarioActual)
   
    useEffect(()=>{ 
        dispatch(usuarioActual())
    },[])

    return (
      miUser.length !== 0 ? <div className="contentHome">

            <NavBar usuario={miUser} />

            
            <div className='contFavoritos'>

            <h1 style={{color: 'white'}}>favoritos</h1>
            {miUser.favoritos.length > 0  ? miUser.favoritos.map(fav => {
                return (
                    
                    <FavNFTS key={fav._id} image={fav.image} id={fav.id} 
                    colection={fav.colection} avaliable={fav.avaliable}
                    creatorId={fav.creatorId} ownerId={fav.ownerId}
                    _id={fav._id} priceBase={fav.priceBase} price={fav.price}
                    />
                )
            })




                : <p>no hay favoritos </p>

            }

            

            {/* ACA SE TIENEN QUE RENDERIZAR LOS NFT QUE ESTEN AGREGADOS A FAVORITOS  */}
            <Link to='/home/usuario/portfolio'> <button className='back-button' >VOLVER AL PORTFOLIO </button></Link>
            </div>
        </div> : <p>Cargadno</p>
    )
}
