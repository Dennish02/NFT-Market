import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'
//import { useNavigate } from 'react-router';
import { autenticarUser } from '../../redux/actions/actionUSER';

export default function VerificacionUsuario() {
    const dispatch = useDispatch()
    let usuario = useSelector(state=>state.usuario)
    //const cargando = useSelector(state => state.loginUser)
    //console.log(usuario);
    const token = localStorage.getItem('token')
useEffect(()=>{
        
    
    if(!token){
        
        return 
    }
    const config = {
        headers : {
            "Content-Type": "application/json",
            Authorization :`Bearer ${token}`
        }
    }
    dispatch(autenticarUser(config))
},[])

 if(!token)  'Cargando'

  return (
    <>
        {token ? <Outlet/> : <Navigate to='/'/>}
    </>
  )     
}
