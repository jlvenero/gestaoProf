import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewHome() {
  const [name, setName] = useState(""); // Estado para armazenar o nome da sala
  const navigate = useNavigate();

  const handleAddSala = async () => {
    if (!name.trim()) {
      alert("Por favor, insira um nome para a sala.");
      return;
    }

    try {
      // Faz a requisição POST para o backend
      const response = await axios.post("http://localhost:3000/api/room", {
        name, // Corpo da requisição
      });

      console.log("Sala adicionada com sucesso:", response.data);
      alert("Sala adicionada com sucesso!");

      // Redireciona ou limpa o estado após sucesso
      setName(""); // Limpa o campo de entrada
      navigate("/home"); // Redireciona para a tela inicial (se necessário)
    } catch (error) {
      console.error("Erro ao adicionar sala:", error);
      alert("Erro ao adicionar a sala. Tente novamente.");
    }
  };

  const handleVoltar = () => {
    navigate("/home"); // Navega para a página inicial
  };

  const handleSair = () => {
    navigate("/"); // Navega para a página de login ou outra tela
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={handleSair} className="exit-button">
          Sair
        </button>
      </div>
      <div className="content">
        <h1>Nova turma</h1>
        <div className="input-group">
          <label className="label">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            className="input"
            value={name} // Vincula o input ao estado
            onChange={(e) => setName(e.target.value)} // Atualiza o estado
          />
        </div>
        <button className="add-button" onClick={handleAddSala}>
          Adicionar sala
        </button>
      </div>
      <div className="footer">
        <button onClick={handleVoltar} className="back-button">
          Voltar
        </button>
      </div>
    </div>
  );
}

export default NewHome;
