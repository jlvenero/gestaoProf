import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [turmas, setTurmas] = useState([]);
  const navigate = useNavigate();

  const fetchTurmas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/room");
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao buscar as turmas:", error);
      alert("Erro ao carregar as turmas.");
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  const handleAcessar = (roomId) => {
    // Navegar para a página da turma específica, passando o ID
    navigate(`/classroom/${roomId}`);
  };

  return (
    <div className="body">
      <div className="header">
        <div className="title">
          <h3>Minhas Turmas</h3>
        </div>
        <div className="exit">
          <span className="exit-buttom">
            <a href="./login">Sair</a>
          </span>
        </div>
      </div>

      <div className="grid-container">
        {turmas.map((room) => (
          <div key={room.id} className="grid-item">
            <h2>Turma: {room.name}</h2>
            <div className="access-class">
              <button onClick={() => handleAcessar(room.id)}>Acessar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">

        <div className="new-class">
          <span className="new-class-buttom">
            <button id="contained" onClick={() => navigate("/newHome")}>Adicionar Turma</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
