import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, TextField } from '@mui/material';
import './style.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Class() {
    const { id } = useParams(); // Pega o ID da turma da URL
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    // Função para buscar alunos da turma
    const fetchStudents = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/student?roomId=${id}`);
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
    }, [id]); // Quando o ID da turma mudar, refaz a requisição

    // Função de edição para alternar entre os modos
    const toggleEdit = (index) => {
        const newStudents = [...students];
        newStudents[index].isEditing = !newStudents[index].isEditing;
        setStudents(newStudents);
    };

    // Função para manipular o campo de notas editado
    const handleGradeChange = (index, gradeType, value) => {
        // Garantir que o valor seja um número válido entre 0 e 10
        const validValue = Math.min(Math.max(parseFloat(value) || 0, 0), 10);
        const newStudents = [...students];
        newStudents[index][gradeType] = validValue;
        setStudents(newStudents);
    };

    // Função para calcular a média
    const calculateAverage = (n1, n2, n3) => {
        const validN1 = isNaN(parseFloat(n1)) ? 0 : parseFloat(n1);
        const validN2 = isNaN(parseFloat(n2)) ? 0 : parseFloat(n2);
        const validN3 = isNaN(parseFloat(n3)) ? 0 : parseFloat(n3);

        const total = validN1 + validN2 + validN3;
        const average = total / 3;

        // Garantir que a média não ultrapasse o intervalo de 0 a 10
        return Math.min(Math.max(average, 0), 10).toFixed(2); // Limitar entre 0 e 10
    };

    return (
        <>
            <div className="header">
                <div>
                    <input type="date" id="data" name="data"></input>
                </div>
                <div className="header-title">
                    <h1>Lista de Alunos da Turma {id}</h1>
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
                            
                            {/* Exibir campos de edição quando estiver no modo de edição */}
                            {row.isEditing ? (
                                <>
                                    <TableCell align='center'>
                                        <TextField
                                            type="number"
                                            value={row.n1 || ''}
                                            onChange={(e) => handleGradeChange(index, 'n1', e.target.value)}
                                            inputProps={{ min: 0, max: 10 }}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TextField
                                            type="number"
                                            value={row.n2 || ''}
                                            onChange={(e) => handleGradeChange(index, 'n2', e.target.value)}
                                            inputProps={{ min: 0, max: 10 }}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TextField
                                            type="number"
                                            value={row.n3 || ''}
                                            onChange={(e) => handleGradeChange(index, 'n3', e.target.value)}
                                            inputProps={{ min: 0, max: 10 }}
                                            fullWidth
                                        />
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell align='center'>{row.n1 || '-'}</TableCell>
                                    <TableCell align='center'>{row.n2 || '-'}</TableCell>
                                    <TableCell align='center'>{row.n3 || '-'}</TableCell>
                                </>
                            )}

                            <TableCell align='center'>{calculateAverage(row.n1, row.n2, row.n3)}</TableCell>

                            <TableCell align='center'>
                                <Button onClick={() => toggleEdit(index)}>
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
                </div>
            </footer>
        </>
    );
}

export default Class;
