import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, TextField } from '@mui/material';
import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Class() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    // Função para buscar alunos do backend
    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/student');
            if (!response.ok) {
                throw new Error(`Erro ao buscar alunos: ${response.statusText}`);
            }
            const data = await response.json();
            setStudents(data); // Atualiza o estado com os alunos retornados
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    };

    // useEffect para carregar os alunos ao montar o componente
    useEffect(() => {
        fetchStudents();
    }, []);

    // Funções existentes para manipulação de dados
    const handleCheckboxChange = (index, checkboxIndex) => {
        const newStudents = [...students];
        newStudents[index].presenca[checkboxIndex] = !newStudents[index].presenca[checkboxIndex];
        setStudents(newStudents);
    };

    const toggleAllPresence = (index, value) => {
        const newStudents = [...students];
        newStudents[index].presenca = newStudents[index].presenca.map(() => value);
        setStudents(newStudents);
    };

    const toggleEdit = (index) => {
        const newStudents = [...students];
        newStudents[index].isEditing = !newStudents[index].isEditing;
        setStudents(newStudents);
    };

    const handleGradeChange = (index, gradeType, value) => {
        const newStudents = [...students];
        newStudents[index][gradeType] = value === '' ? 0 : parseFloat(value);
        setStudents(newStudents);
    };

    const calculateAverage = (n1, n2, n3) => {
        const total = (n1 || 0) + (n2 || 0) + (n3 || 0);
        return (total / 3).toFixed(2);
    };

    return (
        <>
            <div className="header">
                <div>
                    <input type="date" id="data" name="data"></input>
                </div>
                <div className="header-title">
                    <h1>Lista de Alunos</h1>
                </div>
                <div className="header-button">
                    <button onClick={() => navigate('/home')}>Sair</button>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Alunos</TableCell>
                        <TableCell align='center'>N1</TableCell>
                        <TableCell align='center'>N2</TableCell>
                        <TableCell align='center'>N3</TableCell>
                        <TableCell align='center'>Média final</TableCell>
                        <TableCell align='center'>Editar Notas</TableCell>
                        <TableCell align='center'>Presença</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align='center'>{row.name}</TableCell>
                            <TableCell align='center'>{row.n1 || '-'}</TableCell>
                            <TableCell align='center'>{row.n2 || '-'}</TableCell>
                            <TableCell align='center'>{row.n3 || '-'}</TableCell>
                            <TableCell align='center'>{calculateAverage(row.n1, row.n2, row.n3)}</TableCell>
                            <TableCell align='center'>
                                <Button id="contained" onClick={() => toggleEdit(index)}>
                                    {row.isEditing ? "Salvar" : "Editar"}
                                </Button>
                            </TableCell>
                            <TableCell align='center'>
                                {row.presenca?.map((checked, checkboxIndex) => (
                                    <Checkbox
                                        key={checkboxIndex}
                                        checked={checked}
                                        onChange={() => handleCheckboxChange(index, checkboxIndex)}
                                    />
                                ))}
                                <Button
                                    id="contained"
                                    onClick={() => toggleAllPresence(index, true)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Marcar todas
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <footer>
                <div className="footer">
                    <Button id="contained" onClick={() => navigate('/newstudent')}>
                        Cadastrar Aluno
                    </Button>
                    <Button id="contained">Salvar</Button>
                </div>
            </footer>
        </>
    );
}

export default Class;
