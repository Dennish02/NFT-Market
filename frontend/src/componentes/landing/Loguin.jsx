



export default function Loguin({handleChangeModal}) {
  

    const handleSubmit =(e)=>{
      e.preventDefault();
     
    }

  return (
    <div className="contLogin">
      <button className="close" onClick={handleChangeModal}>❌</button>
      <div className="contLogin-content">
      <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input id="email" type="text" placeholder="Your email"/>
            <label htmlFor="password">password</label>
            <input id="password" type="password" placeholder="Your password"/>
            <button
            type="submit"
            className="buttonPrimary"
            >LOGIN</button>
            
        </form>
        <button
            type="submit"
            className="buttonSecondary"
            >LOGIN WITH GOOGLE</button>
      </div>
      
    </div>
  )
}
