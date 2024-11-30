import { TextField, Button, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function NewStudent() {
    const [studentData, setStudentData] = useState({
        name: '',
        n1: '',  // Nota 1
        n2: '',  // Nota 2
        n3: '',  // Nota 3
        roomId: '', // Inicialmente vazio, para ser preenchido
    });
    const [turmas, setTurmas] = useState([]); // Lista de turmas
    const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' });

    // Buscar turmas disponíveis
    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/room');
                setTurmas(response.data); // Preenche as turmas disponíveis
            } catch (error) {
                console.error('Erro ao buscar as turmas:', error);
            }
        };
        fetchTurmas();
    }, []);

    // Função para calcular a média
    const calcularMedia = () => {
        const notas = [studentData.n1, studentData.n2, studentData.n3];
        let soma = 0;
        let count = 0;
        
        // Verifica se a nota é um número e está no intervalo de 0 a 10
        for (let i = 0; i < notas.length; i++) {
            const nota = parseFloat(notas[i]);
            if (!isNaN(nota) && nota >= 0 && nota <= 10) {
                soma += nota;
                count++;
            }
        }

        if (count > 0) {
            return (soma / count).toFixed(2); // Calcula a média
        } else {
            return '0.00'; // Se não houver notas válidas, retorna 0
        }
    };

    // Função para validar e permitir apenas letras no campo de nome
    const handleNameChange = (event) => {
        const value = event.target.value;

        // Permitir apenas letras e espaços no nome
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setStudentData({
                ...studentData,
                name: value
            });
        }
    };

    // Função para validar e permitir apenas números de 0 a 10 nas notas
    const handleNotesChange = (event) => {
        const { name, value } = event.target;

        // Se for uma nota e o valor for numérico e entre 0 e 10
        if (name.startsWith('n') && value) {
            const numValue = parseFloat(value);
            if (isNaN(numValue) || numValue < 0 || numValue > 10) {
                return; // Não permite valores fora do intervalo
            }
        }

        setStudentData({
            ...studentData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        // Verificação para garantir que todos os campos obrigatórios estejam preenchidos
        if (!studentData.name.trim() || !studentData.roomId) {
            setFeedback({ open: true, message: 'O nome e a turma são obrigatórios.', severity: 'warning' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/student', {
                name: studentData.name,
                n1: studentData.n1 || '', // Caso as notas estejam vazias, enviar valor em branco
                n2: studentData.n2 || '', // Caso as notas estejam vazias, enviar valor em branco
                n3: studentData.n3 || '', // Caso as notas estejam vazias, enviar valor em branco
                roomId: studentData.roomId,
            });

            if (response.status === 201) {
                console.log('Aluno cadastrado com sucesso:', response.data);

                setFeedback({ open: true, message: 'Aluno cadastrado com sucesso!', severity: 'success' });

                // Limpa os campos após o sucesso
                setStudentData({ name: '', n1: '', n2: '', n3: '', roomId: '' });
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setFeedback({ open: true, message: 'Erro ao cadastrar o aluno.', severity: 'error' });
        }
    };

    const handleCloseFeedback = () => {
        setFeedback({ ...feedback, open: false });
    };

    return (
        <div className="new-student">
            <h1 className="title">Cadastrar aluno</h1>
            <div className="form-container">
                {/* Campo de nome com validação para permitir apenas letras e espaços */}
                <TextField
                    label="Nome"
                    name="name"
                    value={studentData.name}
                    onChange={handleNameChange}
                    fullWidth
                    margin="normal"
                />

                {/* Campos de nota (n1, n2, n3) */}
                <TextField
                    label="Nota 1"
                    name="n1"
                    value={studentData.n1}
                    onChange={handleNotesChange}
                    fullWidth
                    margin="normal"
                    type="number" // Garante que só números sejam inseridos
                    inputProps={{
                        min: "0", max: "10", step: "0.01" // Limita as notas entre 0 e 10
                    }}
                />
                <TextField
                    label="Nota 2"
                    name="n2"
                    value={studentData.n2}
                    onChange={handleNotesChange}
                    fullWidth
                    margin="normal"
                    type="number" // Garante que só números sejam inseridos
                    inputProps={{
                        min: "0", max: "10", step: "0.01" // Limita as notas entre 0 e 10
                    }}
                />
                <TextField
                    label="Nota 3"
                    name="n3"
                    value={studentData.n3}
                    onChange={handleNotesChange}
                    fullWidth
                    margin="normal"
                    type="number" // Garante que só números sejam inseridos
                    inputProps={{
                        min: "0", max: "10", step: "0.01" // Limita as notas entre 0 e 10
                    }}
                />

                {/* Campo para selecionar a turma */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Turma</InputLabel>
                    <Select
                        label="Turma"
                        name="roomId"
                        value={studentData.roomId}
                        onChange={handleNotesChange}
                    >
                        {turmas.map((turma) => (
                            <MenuItem key={turma.id} value={turma.id}>
                                {turma.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button id="contained" onClick={handleSubmit} variant="contained" color="primary">
                    Cadastrar
                </Button>
            </div>

            <Snackbar
                open={feedback.open}
                autoHideDuration={6000}
                onClose={handleCloseFeedback}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseFeedback} severity={feedback.severity} sx={{ width: '100%' }}>
                    {feedback.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default NewStudent;
