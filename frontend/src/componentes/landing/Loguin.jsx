import { useEffect, useState } from "react";
import { login } from "../../../redux/actions/actionUSER";
import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"


export default function Loguin({handleChangeModal}) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(state => state.usuario)

  const [ usuario, setUsuario ]= useState({
    email:'',
    password:''
  })
  const [errors, setErrors] = useState({})
  const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  function  handleChangeEmail(e){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
    if(!regexEmail.exec(e.target.value)){
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
    // if(!regexPassword.exec(e.target.value)){
    //   e.target.value.length > 16 ? setErrors({
    //     password: "invalid length"
    //   })
    //   : setErrors({
    //     password: "invalid characters"
    //   })
    // }else{
    //   setErrors({
    //     password: ""
    //   })
    // }
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
      if(user)return
      navigate("/home")
    }

    // const handleClickValidation = (e) => {
    //   if(user){
    //     alert("Bienvenido a MarketNFT")
    //   }else{
    //     alert ("No es un usuario valido")
    //   }
    // }

  return (
    <div className="contLogin">
      <button className="close" onClick={handleChangeModal}>❌</button>
      <div className="contLogin-content">
      <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input 
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
                id="password" 
                type="password" 
                value={usuario.password}
                name="password"
                onChange={handleChangePassword}
                placeholder="Your password"/>
            {errors.password && (
              <div>
                <p>{errors.password}</p>
              </div>
            )}
            <button
            type="submit"
            className="buttonPrimary"
            // onClick={handleClickValidation}
            >LOGIN
            </button>
            {/* {user.token ? 
            <Link to="/home">
              
            </Link>
            : null
            } */}
        </form>
        <button
            type="submit"
            className="buttonSecondary"
            >LOGIN WITH GOOGLE</button>
      </div>
      
    </div>
  )
}
