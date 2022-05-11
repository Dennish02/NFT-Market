import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import { navigate } from 'react-router-dom';
import { resetPassword, setStateEmail } from '../../redux/actions/actionUSER';
import validarEmail from "../middleware/validarEmail"

export default function OlvidePassword() {
    const [email, setEmail]= useState('')
    const [errors, setErrors] = useState({})
    const respuesta = useSelector(state => state.errorEmail)
   
    const dispatch = useDispatch();
    
    useEffect(()=>{
        return(()=>{
            dispatch(setStateEmail())
        })
    },[])

    const handleChange = (e) => {
        setEmail(e.target.value);
        if(validarEmail(e.target.value)){
          e.target.value.length > 40 ? setErrors({
            email: "invalid length"
          })
          : setErrors({
            email: "invalid email"
          })
        }else{
          setErrors({
            email: ""
          })
        }
      };
    
      const handleSubmit = (e) => {
       e.preventDefault()
       if(email === ""){
         setErrors({
           email:"this field is required"
         })
       }else {
          dispatch(resetPassword(email))
          setEmail("")
       }
      };
     
      return (
        <div className='flex'>
          <div className="contLogin contREsetPassword">
          <div className="contLogin-content">
            <h3>Ingresá tu email para recuperar tu contraseña</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">email</label>
              <input
                className={errors.email ? "inputError" : "input"}
                name="email"
                value={email}
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Reset email"
              />
              {errors.email && (
                <div>
                  <p className="error">{errors.email}</p>
                </div>
              )}
              {respuesta.error ? <p>HEY HEY HEY</p> : <p>{respuesta.msg}</p> }

             {respuesta.msg? <Link to='/'> <button type="submit" className="buttonPrimary">
                Volver a inicio
              </button> </Link> :  <button type="submit" className="buttonPrimary">
                Reset password
              </button>}
             
            </form>
          </div>
        </div>
        </div>
        
      );
}
