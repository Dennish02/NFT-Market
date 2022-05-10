import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


export default function ResetPassword() {
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
        dispatch(registroUsuario(estado));
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
              placeholder="Your password"
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
            {errores.error && <p className="error">{errores.error}</p>}
            <button type="submit" className="buttonPrimary">
              Reset password
            </button>
          </form>
        </div>
      </div>
      </div>
      
    );

}
