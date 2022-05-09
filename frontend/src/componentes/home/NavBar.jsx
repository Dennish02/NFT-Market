import React from 'react'
import logo from '../../img/logo.png'
import profile from '../../img/profile.png'

export default function NavBar() {
  return (
    <div className='contentNav'>
        <img className='logo' src={logo} alt="Logo Perfil" />
        <div className='perfil'>
            <p>balance: <span>1000</span> </p>
            <img src={profile} alt="Profile User" />
        </div>
    </div>
  )
}
