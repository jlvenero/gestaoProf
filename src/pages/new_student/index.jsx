import { TextField, Button } from '@mui/material';
import './style.css';
import { useState } from 'react';

function NewStudent() {
    const [studentData, setStudentData] = useState({
        name: '',
        matricula: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentData({
            ...studentData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: studentData.name })
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao cadastrar aluno: ${response.statusText}`);
            }
    
            const result = await response.json();
            console.log('Aluno cadastrado com sucesso:', result);
    
            // Limpa os campos após o sucesso
            setStudentData({ name: '', matricula: '' });
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };
    

    return (
            <div className="new-student">
            <h1 className="title">Cadastrar aluno</h1>
            <div className="form-container">
                <TextField
                    label="Nome"
                    name="name"
                    value={studentData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button id="contained" onClick={handleSubmit}>
                    Cadastrar
                </Button>
            </div>
        </div>
    );
}

export default NewStudent;
