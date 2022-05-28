import { useState } from "react";
import { useDispatch } from "react-redux";
import { registroUsuario } from "../../redux/actions/actionUSER";
import { useNavigate } from "react-router";
import validarEmail from "../middleware/validarEmail";
import validatePassword from "../middleware/validarPassword";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
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
      setErrores([0, "there are empty fields"]);
    else if (estado.nombre.length < 3 || estado.nombre.length > 10)
      setErrores([1, "username must have between 3 and 10 characters"]);
    else if (validarEmail(estado.email)) setErrores([2, "invalid email"]);
    else if (validatePassword(estado.password1))
      estado.password1.length < 8
        ? setErrores([3, "the password must have at least 8 characters"])
        : setErrores([3, "invalid password"]);
    else if (validatePassword(estado.password2))
      estado.password2.length < 8
        ? setErrores([4, "the password must have at least 8 characters"])
        : setErrores([4, "invalid password"]);
    else if (estado.password1 !== estado.password2)
      setErrores([5, "passwords must be the same"]);
    else {
      setErrores([]);
      dispatch(registroUsuario(estado));
      navigate("/");
    }
  };

  return (
    <div className="contRegister">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo Corporation" />{" "}
      </Link>
      <div className=" flex ">
        <div className="contLogin">
          <div className="contLogin-content">
            <h3>Register</h3>
            <p>
              You already have an account?{" "}
              <Link to="/login">
                {" "}
                <button className="buttonPrimary">LOGIN</button>{" "}
              </Link>{" "}
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="user">Username</label>
              <input
                className={errores[0] === 1 ? "inputError" : "input"}
                name="nombre"
                value={estado.username}
                onChange={handleChange}
                id="user"
                type="text"
                placeholder="Your username"
              />
              <label htmlFor="email">Email</label>
              <input
                className={errores[0] === 2 ? "inputError" : "input"}
                name="email"
                value={estado.email}
                onChange={handleChange}
                id="email"
                type="text"
                placeholder="Your email"
              />
              <label htmlFor="password">Password</label>
              <input
                className={
                  errores[0] === 3 || errores[0] === 5 ? "inputError" : ""
                }
                name="password1"
                value={estado.password}
                onChange={handleChange}
                id="password1"
                type="password"
                placeholder="Your password"
              />
              <label htmlFor="password">Repeat password</label>
              <input
                className={
                  errores[0] === 4 || errores[0] === 5 ? "inputError" : ""
                }
                name="password2"
                value={estado.password2}
                onChange={handleChange}
                id="password2"
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
