import React, { useState } from 'react'
import logo from '../../img/logo.png'
import profile from '../../img/profile.png'
import Modal from 'react-modal'
import ProfileSettings from '../modalProfile/profileSettings'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const customStyles = {
  content: {
    top: '32%',
    left: '80%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding:'0',
    width: '400px',
  },
};

export default function NavBar() {
  const [showModal, setShowModal] = useState(false)
  const usuario = useSelector((state)=> state.usuario)
  function handleButton(){
    setShowModal(true)
    
  }
  function closeModal(){
   showModal && setShowModal(false)
  }
  
  return (
    <div className='contentNav'  onClick={closeModal}>
       <Link to='/home'> <img className='logo' src={logo} alt="Logo Perfil" /></Link>
      
        <div className='perfil'>
            <p>balance: <span>{usuario.coins}</span> </p>
           <p>{`Hola ${usuario.nombre}`}</p> 
            <img  
            src={profile} 
            alt="Profile User" 
            onClick={handleButton}  
            className="image-click" />
           <Modal
           isOpen={showModal}
           style={customStyles}
           > 
           <ProfileSettings/>

       
           
           
            </Modal>
        </div>
    </div>
  )
}
