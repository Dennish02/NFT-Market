import { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  login,
  resetErrorLoginUser,
  registroGoogle,
} from "../../redux/actions/actionUSER";
import validarEmail from "../middleware/validarEmail";
import validatePassword from "../middleware/validarPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

import { toast } from "react-toastify";

function validate(email, password) {
  let objeto = {};
  if (email === "") objeto = { ...objeto, email: "this field is required" };
  else if (validarEmail(email))
    email.length > 40
      ? (objeto = { ...objeto, email: "invalid length" })
      : (objeto = { ...objeto, email: "invalid format" });

  if (password === "")
    objeto = { ...objeto, password: "this field is required" };
  else if (validatePassword(password))
    objeto = {
      ...objeto,
      password: "Your password must be at least 8 characters",
    };

  return objeto;
}

export default function Loguin() {
  const errorEmail = useSelector((state) => state.errorEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    token ? navigate("/home") : null;
    return () => {
      dispatch(resetErrorLoginUser());
    };
  }, [token]);

  function handleChangeEmail(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      email: "",
    });
  }

  const handleChangePassword = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let val = validate(usuario.email, usuario.password);
    if (Object.keys(val).length === 0) {
      dispatch(login(usuario));
      setUsuario({
        email: "",
        password: "",
      });
      if (errorEmail) {
        e.preventDefault();
      } else {
        dispatch(resetErrorLoginUser());
        navigate("/home");
      }
    } else setErrors(val);
  };

  //wasu wasol
  function responseGoogle(el) {
    dispatch(registroGoogle(el));
    toast.success("login succesfully");
    setTimeout(function () {
      window.location.reload(1);
    }, 2500); // After 2,5 secs
  }
  return (
    <div className="contRegister">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo Corporation" />{" "}
      </Link>
      <div className="flex">
        <div className="contLogin">
          <div className="contLogin-content">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">email</label>
              <input
                className={errors.email ? "inputError" : "input"}
                id="email"
                value={usuario.email}
                type="text"
                name="email"
                onChange={handleChangeEmail}
                placeholder="Your email"
              />
              {errors.email && (
                <div>
                  <p className="error">{errors.email}</p>
                </div>
              )}
              <label htmlFor="password">password</label>
              <input
                className={errors.password ? "inputError" : "input"}
                id="password"
                type="password"
                value={usuario.password}
                name="password"
                onChange={handleChangePassword}
                placeholder="Your password"
              />
              {errors.password && (
                <div>
                  <p className="error">{errors.password}</p>
                </div>
              )}
              {errorEmail && !usuario.email && !usuario.password ? (
                <p className="error">{errorEmail} </p>
              ) : null}
              <button type="submit" className="buttonPrimary">
                LOGIN
              </button>
            </form>
            <GoogleOAuthProvider
              clientId={`${import.meta.env.VITE_URL_CLIENT_ID}`}
            >
              <GoogleLogin login_uri="" onSuccess={responseGoogle} />
            </GoogleOAuthProvider>
            <Link to="/olvide-password/" className="a">
              {" "}
              <h4>forget your password</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
