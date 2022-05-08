



export default function Loguin({handleChangeModal, modal}) {
  return (
    <div className="contLogin">
      <div className="contLogin-content">
      <h3>Login</h3>
        <form>
            <label htmlFor="user">email</label>
            <input id="user" type="text" placeholder="Your email"/>
            <label htmlFor="password">password</label>
            <input id="password" type="text" placeholder="Your password"/>
            <button
            type="submit"
            className="buttonPrimary"
            >LOGIN</button>
        </form>
      </div>
      
    </div>
  )
}
