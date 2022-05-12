import { useState } from "react";
import { useDispatch } from "react-redux";
import { registroUsuario } from "../../redux/actions/actionUSER";

import validarEmail from "../middleware/validarEmail";
import validatePassword from "../middleware/validarPassword";
import logo from '../img/logo.png';
import { Link } from "react-router-dom";

export default function Register() {

  const [estado, setEstado] = useState({
    email: "",
    nombre: "",
    password1: "",
    password2: "",
  });
  const [errores, setErrores] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !estado.email ||
      !estado.nombre ||
      !estado.password1 ||
      !estado.password2
    )
      setErrores([0, "faltan valores"]);
    else if (estado.nombre.length < 3)
      setErrores([1, "Longitud incorrecta username"]);
    else if (validarEmail(estado.email)) setErrores([2, "Email incorrecto"]);
    else if (validatePassword(estado.password1))
      setErrores([3, "Password incorrecto"]);
    else if (validatePassword(estado.password2))
      setErrores([4, "Password incorrecto"]);
    else if (estado.password1 !== estado.password2)
      setErrores([5, "Los passwords son distintos"]);
    else {
      setErrores([]);
      dispatch(registroUsuario(estado));
    }
  };

  return (
    <div className="contRegister">
     <Link to='/'><img className="logo" src={logo} alt="Logo Corporation" /> </Link> 
        <div className=" flex ">
     
        <div className="contLogin">
      <div className="contLogin-content">
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">username</label>
          <input
            className={errores[0] === 1 ? "inputError" : "input"}
            name="nombre"
            value={estado.username}
            onChange={handleChange}
            id="user"
            type="text"
            placeholder="Your username"
          />
          <label htmlFor="email">email</label>
          <input
            className={errores[0] === 2 ? "inputError" : "input"}
            name="email"
            value={estado.email}
            onChange={handleChange}
            id="email"
            type="text"
            placeholder="Your email"
          />
          <label htmlFor="password">password</label>
          <input
            className={errores[0] === 3 || errores[0] === 5 ? "inputError" : ""}
            name="password1"
            value={estado.password}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Your password"
          />
          <label htmlFor="password">enter password again</label>
          <input
            className={errores[0] === 4 || errores[0] === 5 ? "inputError" : ""}
            name="password2"
            value={estado.password2}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="enter password again"
          />
          {errores.length !== 0 && <p className="error">{errores[1]}</p>}

          <button type="submit" className="buttonPrimary">
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
    
    </div>
    
  );
}
