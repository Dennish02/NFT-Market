import { useEffect, useState } from "react";
import logo from '../img/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";
import { login, resetErrorLoginUser } from "../../redux/actions/actionUSER";
import validarEmail from "../middleware/validarEmail";
import validatePassword from "../middleware/validarPassword";
// import { Link } from "react-router-dom"



export default function Loguin() {
  const errorEmail = useSelector(state=> state.errorEmail);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const [ usuario, setUsuario ]= useState({
    email:'',
    password:''
  })
  const [errors, setErrors] = useState({})

  useEffect(()=>{
   token ? navigate('/home'): null
   return(()=>{
    dispatch(resetErrorLoginUser())
   })   
  },[token])

  function handleChangeEmail(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    if (validarEmail(e.target.value)) {
      e.target.value.length > 40
        ? setErrors({
            email: "invalid length",
          })
        : setErrors({
            email: "invalid email",
          });
    } else {
      setErrors({
        email: "",
      });
    }
  }
  const handleChangePassword = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });

    if (validatePassword(e.target.value)) {
      setErrors({
        ...errors,
        password: "Your password must be at least 8 characters"
      })
    }
    else {
      setErrors({
        ...errors,
        password: ""
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (usuario.email === "") {
      setErrors({
        email: "Your password must be at least 8 characters",
      });
    } else if (usuario.password === '') {
      setErrors({
        password: "this field is required"
      })
    }
     else {
      
      dispatch(login(usuario))
      setUsuario({
        email: '',
        password: ''
      })
      if(errorEmail){
        e.preventDefault()
      }else{ 
        dispatch(resetErrorLoginUser()) 
        navigate('/home')
      }
    }
  }




  return (
    <div className="contRegister">
        <Link to='/'><img className="logo" src={logo} alt="Logo Corporation" /> </Link> 
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
              <p>{errors.email}</p>
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
          {errorEmail ? <p className="error">{ errorEmail} </p> : null}
          <button type="submit" className="buttonPrimary">
            LOGIN
          </button>
        </form>
        <button type="button" className="buttonSecondary">
          LOGIN WITH GOOGLE
        </button>
        <Link to="/olvide-password/" className="a">
          {" "}
          <h4>Olvide Password</h4>
        </Link>
      </div>
    </div>
    </div>
    </div>
  
  )

}
