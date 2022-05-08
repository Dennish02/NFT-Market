
export default function Register({handleChangeModalRegister}) {
  

    const handleSubmit =(e)=>{
      e.preventDefault();
     
    }

  return (
    <div className="contLogin">
      <button className="close" onClick={handleChangeModalRegister}>❌</button>
      <div className="contLogin-content">
      <h3>Register</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input id="email" type="text" placeholder="Your email"/>
            <label htmlFor="user">username</label>
            <input id="user" type="text" placeholder="Your username"/>
            <label htmlFor="password">password</label>
            <input id="password" type="password" placeholder="Your password"/>
            <label htmlFor="password">enter password again</label>
            <input id="password" type="password" placeholder="enter password again"/>
            <button
            type="submit"
            className="buttonPrimary"
            >Register</button>
        </form>
      </div>
      
    </div>
  )
}