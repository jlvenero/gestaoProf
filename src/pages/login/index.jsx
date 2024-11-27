import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/api/user/login', {
      email: email,
      password: password
    }, { withCredentials: true })
    .then(({ data }) => {
      alert("Login bem-sucedido");
      window.location.href = "/home";
    })
    .catch((err) => {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    });
  }
  
  return (
    <div className="split">
      <div className="title">
        <h1>Portal do Professor</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='container1'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='container2'>
          <button className="submit" type="submit">Entrar</button>
          <span className='sign-in'>
            <a href='../signin'>Crie sua conta!</a>
          </span>       
        </div>
      </form>
    </div>
  );
}

export default Login;
