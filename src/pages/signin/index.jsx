import './style.css'

var check = function() {
  if (document.getElementById('Password').value == document.getElementById('Password-Confirmation').value) {
    document.getElementById('Message').innerHTML = ''
  } else {
    document.getElementById('Message').style.color = 'red';
    document.getElementById('Message').style.marginLeft = '35%';
    document.getElementById('Message').style.fontFamily = 'Poppins';
    document.getElementById('Message').innerHTML = 'As senhas não coincidem!';
  }
}

function SignIn() {
  return (
    <div className="split left">
      <div className="title">
        <h1>Portal do Professor</h1>
      </div>
      <form action="">
        <div className='container1'>
          <input type='text' placeholder='Nome completo' name='Name' required></input>
          <input type='text' placeholder='E-mail' name='Username' required></input>
          <input type='password' placeholder='Senha' name='Password' id='Password' required></input>
          <input type='password' placeholder='Confirme sua senha' name='Password-Confirmation' id='Password-Confirmation' onKeyUp={check} required></input>
          <span id='Message' name='Message'></span>
        </div>
        <div className='container2'>
          <span className='sign-in'><a href='../index.jsx'>Já tem uma conta?</a></span>
          <button type='submit'> Criar conta </button>
        </div>
      </form>
    </div>
  )
}

export default SignIn