import React, { useEffect, useRef } from 'react'
import {FcHeatMap} from "react-icons/fc"
export default function ProfileSettings({closeModal}) {
    let menuRef = useRef('')
   useEffect(() => {
    document.addEventListener('click', (event) => {
        if(!menuRef.current.contains(event.target)){
            closeModal()
        }
       
  
      });
   }, [])
   
    return (
      
        <div   ref={menuRef} className='profileModal'>
         
            <div className='divPortfolio'>
                
               <a href="/portfolio"> <h1 className='font-size' >portfolio {<FcHeatMap className='icon'/>} </h1> </a>
            </div>
            
                <h1>wallet</h1>
           
                <h1>settings</h1>
            
                <h1>logout</h1>
            </div>

        
    )
}
