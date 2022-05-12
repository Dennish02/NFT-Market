import React, { useEffect, useState } from 'react'
import Carrusel from '../componentes/landing/Carrusel'
import Formulario from '../componentes/landing/Formulario'
import Loguin from '../componentes/landing/Loguin'
import Modal from 'react-modal';
import Register from '../componentes/landing/Register';
import { useDispatch } from 'react-redux';
import { autenticarUser } from '../../redux/actions/actionUSER';
import { useNavigate } from 'react-router';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding:'0'
    },
  };
  
  Modal.setAppElement('#root');

export default function LnadingPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modal, setModal]= useState(false)
    const [modalRegister, setModalRegister] = useState(false)  

    
    const handleChangeModalRegister = ()=>{
        setModalRegister(!modalRegister)
        }
  
    const handleChangeModal = ()=>{
    setModal(!modal)
    }
   
    /*Dennis: puse este useEfect para que vea si el ususario dejó la sesion activa
    ?o si cerró sesion, caso de que tenga activa
    lo redirecciona*/
    useEffect(()=>{
        
        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        const config = {
            headers : {
                "Content-Type": "application/json",
                Authorization :`Bearer ${token}`
            }
        }
       const verificacion =  dispatch(autenticarUser(config))
       verificacion && navigate('/home')
    },[])
   

    return (
        <div className='landing'>
            <div className='contentbutton'>
                <button 
                    className='buttonPrimary'
                    onClick={handleChangeModal}
                    >LOGIN</button>
                <button 
                className='buttonPrimary'
                onClick={handleChangeModalRegister}
                >REGISTER</button>
            </div>
            <div className='contLanding'>
                <div className='contLandingOne'>

                    <Formulario />
                    <Carrusel />
                    <Modal
                        isOpen={modal}
                        style={customStyles}
                        
                        setModalRegister={setModalRegister}
                    >
                         <Loguin handleChangeModal={handleChangeModal}/>
                    </Modal>
                    <Modal
                        isOpen={modalRegister}
                        style={customStyles}  
                        setModalRegister={setModalRegister}
                    >
                         <Register handleChangeModalRegister={handleChangeModalRegister}/>
                    </Modal>
                </div>
            </div>

        </div>

    )
}
