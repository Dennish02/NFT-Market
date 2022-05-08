import React, { useState } from 'react'
import Carrusel from '../componentes/landing/Carrusel'
import Formulario from '../componentes/landing/Formulario'
import Loguin from '../componentes/landing/Loguin'
import Modal from 'react-modal';
import Register from '../componentes/landing/Register';


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
    const [modal, setModal]= useState(false)
    const [modalRegister, setModalRegister] = useState(false)  

    
    const handleChangeModalRegister = ()=>{
        setModalRegister(!modalRegister)
        }
  
    const handleChangeModal = ()=>{
    setModal(!modal)
    }
   
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
