import React from 'react'

import { Link } from 'react-router-dom';


export default function Formulario() {
  

    return (
        <div>
            <h1 className='tituloPagina'> <span>NFT</span>  Martket</h1>
            <div className='contDescription'>
                <div>
                 <p>
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad 
                 </p>
                </div>
              <Link to='/home'>
              <button className='buttonPrimary'>
                    view more
                </button>
              </Link>
               
               
               
            </div>
        </div>
    )
}
