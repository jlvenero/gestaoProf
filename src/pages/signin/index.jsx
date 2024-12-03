import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

function SignIn() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/api/user', {
      name: name,
      email: email,
      password: password
    }, { withCredentials: true })
    .then(({ data }) => {
      alert("Criação de usuário bem-sucedida");
      window.location.href = "/login";
    })
    .catch((err) => {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    });
  }

  return (
    <div className="split left">
      <div className="title">
        <h1>Portal do Professor</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='container1'>
          <input type='email' name='email' placeholder='E-mail' valeu={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type='text' name='name' placeholder='Nome completo' valeu={name} onChange={(e) => setName(e.target.value)} required />
          <input type='password' placeholder='Senha' name='password' id='password' valeu={password} onChange={(e) => setPassword(e.target.value)} required />
          <span id='Message' name='Message'></span>
        </div>
        <div className='container2'>
          <button className='submit' type='submit'> Criar conta </button>
          <span className='sign-in'><a href='../login'>Já tem uma conta?</a></span>
        </div>
      </form>
    </div>
  )
}

export default SignIn