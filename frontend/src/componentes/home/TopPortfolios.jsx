import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { topPortfolios } from '../../../redux/actions/actionUSER';
import ComponentNFT from './ComponentNFT'
import perfil from '../../img/profile.png'
import  {Pagination} from 'swiper'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";



export default function TopPortfolios({usuario}) {
    const ranking = useSelector(state=> state.ranking)
    const dispatch = useDispatch()
   
   
   useEffect(()=>{
    dispatch(topPortfolios())
   },[])
   const limite = ranking.slice(0, 3)
  
  return (
    <section className='contentTopPortfolios'>
            <h3 className='TitleTopPortfolios'>top portfolios users</h3>
            
            {limite.length !== 0 ? limite.map(user=>{
                return(
                    <div className='contentTopPortfolios--contendio' key={user._id}>
                        
                        <nav className='navTopPortfolio'>
                            <div className='contImgProfile'>
                                 <img className='profilePicture' src={user.image.url ? user.image.url : perfil} alt="Profile User" />
                            </div>
                            
                            <p className='nameUser'>{user.nombre}</p>
                        </nav>
                       <div className='contentSwiper'>
                       <Swiper
                            slidesPerView={3}
                            spaceBetween={100}
                            pagination
                            navigation
                        >
                              
                            
                            {user.nfts.length !== 0 ? user.nfts?.map((nft, i) => {
                               
                                    return (
                                      
                                        <SwiperSlide key={nft_id}>

                                            <ComponentNFT
                                                
                                                usuario={usuario.nombre}
                                                id={nft.id}
                                                image={nft.image}
                                                colection={nft.colection}
                                                priceBase={nft.priceBase}
                                                price={nft.price}
                                                creatorId={nft.creatorId}
                                                ownerId={nft.ownerId}
                                                avaliable={nft.avaliable}
                                            />
                                       
                                       </SwiperSlide>

                                    )

                                


                            }
                            ) : <p>Este usuario no tiene nft</p>} 
                           
                        </Swiper>

                       </div>
                       

                    </div>
                )
               
              
            }) : <p>Cargando</p>}
           
         
    </section>
  )
}
