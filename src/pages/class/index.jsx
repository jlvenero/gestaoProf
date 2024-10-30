import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, TextField } from '@mui/material';
import './style.css';
import { useState } from 'react';
//import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function createData(name, n1, n2, n3, presenca) {
    return { name, n1, n2, n3, presenca, isEditing: false };  // Adicionando estado de edição
}

const rows = [
    createData('Lucas', 8, 9, 10, [true, false, true, true]),
    createData('Maria', 7, 8, 9, [false, false, false, false]),
    createData('jose', 7, 8, 9, [false, false, false, false]),
    createData('joao', 7, 8, 9, [false, false, false, false]),
    createData('cleiton', 7, 8, 9, [false, false, false, false]),
    createData('Maria', 7, 8, 9, [false, false, false, false])
];

function Class() {
    const [students, setStudents] = useState(rows);

    // Função para manipular a mudança nos checkboxes
    const handleCheckboxChange = (index, checkboxIndex) => {
        const newStudents = [...students];
        newStudents[index].presenca[checkboxIndex] = !newStudents[index].presenca[checkboxIndex];
        setStudents(newStudents);
    };

    // Função para marcar/desmarcar todas as presenças
    const toggleAllPresence = (index, value) => {
        const newStudents = [...students];
        newStudents[index].presenca = newStudents[index].presenca.map(() => value);
        setStudents(newStudents);
    };

    // Função para habilitar o modo de edição de notas
    const toggleEdit = (index) => {
        const newStudents = [...students];
        newStudents[index].isEditing = !newStudents[index].isEditing;
        setStudents(newStudents);
    };

    // Função para manipular a mudança nas notas
    const handleGradeChange = (index, gradeType, value) => {
        const newStudents = [...students];
        // Se o valor for vazio, define como 0
        newStudents[index][gradeType] = value === '' ? 0 : parseFloat(value);
        setStudents(newStudents);
    };

    // Função para calcular a média considerando 0 quando o campo estiver vazio
    const calculateAverage = (n1, n2, n3) => {
        const total = (n1 || 0) + (n2 || 0) + (n3 || 0);  // Se estiver vazio, considera 0
        return (total / 3).toFixed(2);
    };

    return (
        <>
            <div className="header">
                <div>
                    <input type="date" id="data" name="data">
                    </input>

                </div>
                <div className="header-title">
                    <h1>teste</h1>
                </div>
                <div className="header-button">
                    <button>Sair</button>
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

                            {/* Colunas de notas (N1, N2, N3) com modo de edição */}
                            {row.isEditing ? (
                                <>
                                    <TableCell>
                                        <TextField
                                            className='custom-input'
                                            variant="standard"
                                            type="number"
                                            value={row.n1 || ''}
                                            onChange={(e) => handleGradeChange(index, 'n1', e.target.value)}
                                            inputProps={{ min: 0, max: 10 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className='custom-input'
                                            variant="standard"
                                            type="number"
                                            value={row.n2 || ''}
                                            onChange={(e) => handleGradeChange(index, 'n2', e.target.value)}
                                            inputProps={{ min: 0, max: 10 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className='custom-input'
                                            variant="standard"
                                            type="number"
                                            value={row.n3 || ''}
                                            onChange={(e) => handleGradeChange(index, 'n3', e.target.value)}
                                            inputProps={{ min: 0, max: 10 }}
                                        />
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell align='center' >{row.n1}</TableCell>
                                    <TableCell align='center'>{row.n2}</TableCell>
                                    <TableCell align='center'>{row.n3}</TableCell>
                                </>
                            )}

                            {/* Cálculo da média final */}
                            <TableCell align='center'>{calculateAverage(row.n1, row.n2, row.n3)}</TableCell>

                            {/* Botão para editar notas */}
                            <TableCell align='center'>
                                <Button id="contained" onClick={() => toggleEdit(index)}>
                                    {row.isEditing ? "Salvar" : "Editar"}
                                </Button>
                            </TableCell>

                            {/* Checkboxes de presença */}
                            <TableCell align='center'>
                                {row.presenca.map((checked, checkboxIndex) => (
                                    <Checkbox
                                        key={checkboxIndex}
                                        checked={checked}
                                        onChange={() => handleCheckboxChange(index, checkboxIndex)}
                                    />
                                ))}

                                {/* Botão para preencher todas as aulas de presença */}
                                <Button
                                    id="contained"
                                    onClick={() => toggleAllPresence(index, true)}  // Preenche todas as aulas como "presente"
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
                <div class='footer'>
                    <Button id='contained'>Cadastrar Aluno</Button>
                    <Button id='contained'>Salvar</Button>
                </div>
            </footer>
        </>
    );
}

export default Class;
