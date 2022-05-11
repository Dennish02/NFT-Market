import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { resetPassword } from '../../redux/actions/actionUSER.js';


export default function ResetPassword() {
  const params = useParams()
  const respuesta = useSelector(state => state.errorEmail)
  const { token }= params
    const [estado, setEstado] = useState({
      password: "",
      password2: "",
    });
    const [errores, setErrores] = useState({
      error: "",
    });
  
    const dispatch = useDispatch();
  
    const handleChange = (e) => {
      setEstado({
        ...estado,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (estado.password !== estado.password2)
        setErrores({ ...errores, error: "Las contraseñas no coinciden" });
      else {
        setErrores({ ...errores, error: "" });
        dispatch(resetPassword({
          token: token,
          password: estado.password}));
      }
    };
  
    return (
      <div className='flex'>
        <div className="contLogin contREsetPassword">
        <div className="contLogin-content">
          <h3>Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">password</label>
            <input
              className={errores.error ? "inputError" : "input"}
              name="password"
              value={estado.password}
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="Reset password"
            />
            <label htmlFor="password">enter password again</label>
            <input
              className={errores.error ? "inputError" : "input"}
              name="password2"
              value={estado.password2}
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="enter password again"
            />
             {respuesta.error ? <p className='error'>{respuesta.error}</p> : <p>{respuesta.msg}</p> }
            {errores.error && <p className="error">{errores.error}</p>}
            
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
