import './style.css'

function Login() {
  return (
    <div className="split left">
      <div className="title">
        <h1>Portal do Professor</h1>
      </div>
      <form action="">
        <div className='container1'>
          <input type='text' placeholder='E-mail' name='Username' required></input>
          <input type='password' placeholder='Senha' name='Password' required></input>
        </div>
        <div className='container2'>
          <span className='sign-in'><a href='#'>Crie sua conta!</a></span>
          <button type='submit'> Entrar </button>
        </div>        
      </form>
    </div>
  )
}

export default Login