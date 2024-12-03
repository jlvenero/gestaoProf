import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, TextField } from '@mui/material';
import './style.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Class() {
    const { id } = useParams(); // Pega o ID da turma da URL
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Definir data padrão (hoje)
    const navigate = useNavigate();

    // Função para buscar alunos da turma com a data
    const fetchStudents = async (date) => {
        try {
            const response = await fetch(`http://localhost:3000/api/student?roomId=${id}&date=${date + "T00:00:00.000Z"}`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar alunos: ${response.statusText}`);
            }
            const data = await response.json();
            setStudents(data); // Atualiza o estado com os alunos retornados
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    };

    const updateAttendance = async (callStudentId, studentId, present, date) => {
        try {
            const response = await fetch(`http://localhost:3000/api/call_student/${callStudentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: studentId,
                    date: date + "T00:00:00.000Z",
                    present: present,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar presença: ${response.statusText}`);
            }

            console.log(`Presença do aluno ${studentId} atualizada para ${present ? 'presente' : 'ausente'}`);
        } catch (error) {
            console.error('Erro ao atualizar presença:', error);
        }

    }

    // Função para atualizar a presença do aluno
    const createAttendance = async (studentId, present, date) => {
        try {
            const response = await fetch('http://localhost:3000/api/call_student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: studentId,
                    date: date + "T00:00:00.000Z",
                    present: present,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar presença: ${response.statusText}`);
            }

            console.log(`Presença do aluno ${studentId} atualizada para ${present ? 'presente' : 'ausente'}`);
        } catch (error) {
            console.error('Erro ao atualizar presença:', error);
        }
    };

    // Função que executa a busca de alunos toda vez que a data mudar
    useEffect(() => {
        fetchStudents(selectedDate);
    }, [selectedDate, id]); // Quando o ID da turma ou a data mudarem, refaz a requisição
    const toggleEdit = (index) => {
        const newStudents = [...students];
        newStudents[index].isEditing = !newStudents[index].isEditing;
        setStudents(newStudents);
    };

    const toggleEditRequest = async (index, student) => {
        console.log('toggleEditRequest', student)
        try {
            const response = await fetch(`http://localhost:3000/api/student/${student?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    n1: student.n1,
                    n2: student.n2,
                    n3: student.n3,
                    name: student.name,
                    room_id: student.room_id,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar presença: ${response.statusText}`);
            }

            fetchStudents(selectedDate);
        } catch (error) {
            console.error('Erro ao atualizar presença:', error);
        }
        
        
    }
    
    // Função para manipular a mudança de presença via checkbox
    const handleCheckboxChange = async (index) => {
        const newStudents = [...students];
        const student = newStudents[index];
        console.log(!student?.calls[0]?.present);
        const newPresentStatus = !student?.calls[0]?.present; // Alterna o status de presença

      //  student.present = newPresentStatus;
        //setStudents(newStudents);

        // Enviar requisição para atualizar a presença no backend
        if(student?.calls[0]?.id){
            await updateAttendance(student?.calls[0]?.id, student.id, newPresentStatus, selectedDate);

        } else {
            await createAttendance(student.id, newPresentStatus, selectedDate);
        }

        fetchStudents(selectedDate);
    };

    // Função para manipular a mudança de data
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleGradeChange = (index, gradeType, value) => {
        // Garantir que o valor seja um número válido entre 0 e 10
        const validValue = Math.min(Math.max(parseFloat(value) || 0, 0), 10);
        const newStudents = [...students];
        newStudents[index][gradeType] = validValue;
        setStudents(newStudents);
    }

    // Função para calcular a média
    const calculateAverage = (n1, n2, n3) => {
        const validN1 = isNaN(parseFloat(n1)) ? 0 : parseFloat(n1);
        const validN2 = isNaN(parseFloat(n2)) ? 0 : parseFloat(n2);
        const validN3 = isNaN(parseFloat(n3)) ? 0 : parseFloat(n3);

        const total = validN1 + validN2 + validN3;
        const average = total / 3;
        return Math.min(Math.max(average, 0), 10).toFixed(2); // Limitar entre 0 e 10
    };

    return (
        <>
            <div className="header">
                <div>
                    <input 
                        type="date" 
                        id="data" 
                        name="data" 
                        value={selectedDate} 
                        onChange={handleDateChange}
                    />
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
                                <Button onClick={() => row.isEditing ? toggleEditRequest(index, row) : toggleEdit(index)}>
                                    {row.isEditing ? "Salvar" : "Editar"}
                                </Button>
                            </TableCell>

                            <TableCell align='center'>
                                <Checkbox
                                    checked={row?.calls[0]?.present || false}
                                    onChange={() => handleCheckboxChange(index)}
                                />
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
