import React from 'react'
import Carrusel from '../componentes/landing/Carrusel'
import Formulario from '../componentes/landing/Formulario'


export default function LnadingPage() {
    return (
        <div className='contLanding'>
            <div className='contLandingOne'>

                <Formulario />
                <Carrusel />

            </div>
        </div>

    )
}
