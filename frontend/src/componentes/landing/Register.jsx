import { useState } from "react";
import { useDispatch } from "react-redux";
import { registroUsuario } from "../../../redux/actions/actionUSER";

export default function Register({ handleChangeModalRegister }) {
  const [estado, setEstado] = useState({
    email: "",
    nombre: "",
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
    else if (
      !estado.email ||
      !estado.nombre ||
      !estado.password ||
      !estado.password2
    )
      setErrores({ ...errores, error: "Faltan valores" });
    else {
      setErrores({ ...errores, error: "" });
      dispatch(registroUsuario(estado));
    }
  };

  return (
    <div className="contLogin">
      <button className="close" onClick={handleChangeModalRegister}>
        ❌
      </button>
      <div className="contLogin-content">
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">username</label>
          <input
            name="nombre"
            value={estado.username}
            onChange={handleChange}
            id="user"
            type="text"
            placeholder="Your username"
          />
          <label htmlFor="email">email</label>
          <input
            name="email"
            value={estado.email}
            onChange={handleChange}
            id="email"
            type="text"
            placeholder="Your email"
          />
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
