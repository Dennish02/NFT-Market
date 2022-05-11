import React, { useState } from 'react'
import logo from '../../img/logo.png'
import profile from '../../img/profile.png'
import Modal from 'react-modal'
import ProfileSettings from '../modalProfile/profileSettings'
const customStyles = {
  content: {
    top: '28%',
    left: '92%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding:'0',
    
  },
};

export default function NavBar() {
  const [showModal, setShowModal] = useState(false)
  function handleButton(){
    setShowModal(true)
    
  }
  function closeModal(){
    setShowModal(false)
  }
  return (
    <div className='contentNav'>
        <img className='logo' src={logo} alt="Logo Perfil" />
        <div className='perfil'>
            <p>balance: <span>1000</span> </p>
            <img  src={profile} alt="Profile User" onClick={handleButton}  className="image-click" />
           <Modal
           isOpen={showModal}
           style={customStyles}
           > 
           <ProfileSettings closeModal={closeModal}/>

       
           
           
            </Modal>
        </div>
    </div>
  )
}
