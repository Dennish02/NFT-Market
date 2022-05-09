import React, { useEffect, useState } from 'react'
import image from "../../img/nft.png"
import image1 from "../../img/nft1.png"
import image2 from "../../img/nft2.png"



export default function Carrusel() {
    const [imagen, setImagen]= useState()

    var indice = 0;

    useEffect(()=>{
        rotarImagenes();
        setInterval(rotarImagenes,4000);    
    },[indice])
    
    var imagenes = [ image, image1, image2]

    function rotarImagenes() {
        setImagen()
        setImagen(imagenes[indice])
        indice++;
        if (indice == 3) { indice = 0; };
    }  

    return (
        <div className='carr'>
            <img src={imagen} alt="nft" width="300px" height="500px" />
           
        </div>
    )
}
