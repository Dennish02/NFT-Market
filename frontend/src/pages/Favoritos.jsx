import React, { useEffect } from 'react'
import NavBar from '../componentes/home/NavBar'
import { Link } from 'react-router-dom'
import FavNFTS from '../componentes/favoritos/FavNFTS'
import { useDispatch, useSelector } from 'react-redux'
import { usuarioActual } from '../../redux/actions/actionUSER'
import io from "socket.io-client";
import { allNftMarket } from '../../redux/actions/actionNFT'
let socket;


export default function Favoritos() {
    const dispatch = useDispatch()
    const miUser = useSelector(state => state.usuarioActual)

    
=======    const params = window.location.href;


  

    useEffect(()=>{ 
        dispatch(usuarioActual())
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit("RenderFav", params);
    },[])

    useEffect(()=>{ 
        socket.on("updatefav", () => {
            dispatch(usuarioActual())
            dispatch(allNftMarket());
          })
        
    },[])
    let userId = ''
    miUser.nfts? userId = miUser.nfts[0].ownerId : null
    
    return (
      miUser.length !== 0 ? <div className="contentHome">

            <NavBar usuario={miUser} />

            
            <div className='contFavoritos'>

            <h1 style={{color: 'white'}}>favoritos</h1>
            {miUser.favoritos.length > 0  ? miUser.favoritos.map(fav => {
                
                if(fav.ownerId != userId){
                    return (
                        <FavNFTS key={fav._id} image={fav.image} id={fav.id} 
                        colection={fav.colection} avaliable={fav.avaliable}
                        creatorId={fav.creatorId} ownerId={fav.ownerId}
                        _id={fav._id} priceBase={fav.priceBase} price={fav.price}
                        />
                    )
                } else{
                    null
                }
                    
               
            })
                : <p>no hay favoritos </p>
            }

            

            {/* ACA SE TIENEN QUE RENDERIZAR LOS NFT QUE ESTEN AGREGADOS A FAVORITOS  */}
            <Link to='/home/usuario/portfolio'> <button className='back-button' >VOLVER AL PORTFOLIO </button></Link>
            </div>
        </div> : <p>Cargando</p>
    )
}
