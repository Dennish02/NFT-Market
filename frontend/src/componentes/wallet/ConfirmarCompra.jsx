import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { setNewCoin } from '../../../redux/actions/actionNFT'

export default function ConfirmarCompra() {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const cantidad = localStorage.getItem('valor')
    useEffect(()=>{
    dispatch(setNewCoin(cantidad))   
    localStorage.removeItem('valor')
    return(()=>{
      navigate('/home')
    })
    },[])

  return (
    <div className='contConfirmar'>
        <h2><span>NFT</span> Market</h2>
       <p>Tus CoinLie se actualizaron</p>
        <Link to='/home'>
        <button className='buttonPrimary'>Volver a inicio</button>
        </Link>
        
    </div>
  )
}
