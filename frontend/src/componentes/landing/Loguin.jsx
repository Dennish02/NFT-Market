import { useState } from "react";
import { login } from "../../../redux/actions/actionUSER";
import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import validarEmail from "../../middleware/validarEmail";
import validatePassword from "../../middleware/validarPassword";
// import { Link } from "react-router-dom"


export default function Loguin({handleChangeModal}) {

  const dispatch = useDispatch()
  // const navigate = useNavigate();
  // const user = useSelector(state => state.usuario)

  const [ usuario, setUsuario ]= useState({
    email:'',
    password:''
  })
  const [errors, setErrors] = useState({})
  
  function  handleChangeEmail(e){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
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
    console.log(usuario)
  }
  const handleChangePassword = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })

    if(validatePassword(e.target.value)){
      if(e.target.value.length < 8){
        setErrors({
         ...errors,
         password: "Your password must be at least 8 characters"
       })
     }else{
      setErrors({
         ...errors,
         password: ""
       })
     }
   }
  }
    const handleSubmit =(e)=>{
      e.preventDefault();
      if(usuario.email === ""){
        setErrors({
          email: "this field is required",
        })
      }else if(usuario.password === ""){
        setErrors({
          password: "this field is required"
        })
      }else {
        dispatch(login(usuario))
        setUsuario("")
      }
    }

  return (
    <div className="contLogin">
      <button className="close" onClick={handleChangeModal}>❌</button>
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
                placeholder="Your email"/>
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
                placeholder="Your password"/>
            {errors.password && (
              <div>
                <p className="error">{errors.password}</p>
              </div>
            )}
            <button
            type="submit"
            className="buttonPrimary"
            >LOGIN
            </button>
    
        </form>
        <button
            type="submit"
            className="buttonSecondary"
            >LOGIN WITH GOOGLE</button>
      </div>
      
    </div>
  )
}
