import React, { useEffect } from 'react'
import NavBar from '../componentes/home/NavBar'
import { Link } from 'react-router-dom'


function Settings() {

  return (
    <div>
        <NavBar/>
        <div>
            <Link to="/update-password">
            <p>-Change password</p>
            </Link>
        </div>
    </div>
  )
}

export default Settings