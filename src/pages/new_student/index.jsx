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

    const handleSubmit = () => {
        console.log("Dados do aluno:", studentData);
        setStudentData({ name: '', matricula: '' });
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
                <TextField
                    label="Matrícula"
                    name="matricula"
                    value={studentData.matricula}
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
