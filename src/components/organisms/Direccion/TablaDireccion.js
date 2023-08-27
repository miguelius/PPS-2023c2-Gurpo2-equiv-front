import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getEquivalenciaPorDirectivo } from '../../../services/equivalencia_service';
import { getEquivalenciaSuperUsuario } from '../../../services/equivalencia_service';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const columns = [
    { id: 'dni', label: 'DNI', minWidth: 100, align: 'center' },
    { id: 'solicitante', label: 'Solicitante', minWidth: 140, align: 'center' },
    { id: 'materia', label: 'Materia', minWidth: 140, align: 'center' },
    { id: 'dateTime', label: 'Fecha', minWidth: 100, align: 'center' },
    { id: 'carrera', label: 'Carrera', minWidth: 140, align: 'center' },
    { id: 'actions', label: 'Acciones', minWidth: 100, align: 'center' }
];

function createData(solicitante, dni, materia, id, dateTime, carrera) {
    const actions = (
        <Link
            to={'/direccion/revision/' + id}
            style={{ textDecoration: 'none' }}
        >
            <Button>Revisar</Button>
        </Link>
    ); //acciones lleva a pantalla revision de ese id
    return { solicitante, dni, materia, dateTime, actions, carrera };
}

export default function StickyHeadTable({ searchQuery }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const fetchEquivalenciaData = async () => {
            function obtainedEquivalenciaData() {
                if (JSON.parse(localStorage.getItem('rol')) === 'directivo') {
                    return getEquivalenciaPorDirectivo();
                    // JSON.parse(localStorage.getItem('id'))
                    // );
                } else if (
                    JSON.parse(localStorage.getItem('rol')) === 'superusuario'
                ) {
                    return getEquivalenciaSuperUsuario();
                }
            }

            let array = [];
            let equivalenciaData = await obtainedEquivalenciaData();
            console.log(equivalenciaData);

            equivalenciaData.forEach(function (arrayItem) {
                let d = new Date(arrayItem.createdAt); //tengo que traer solicitantes
                let dateTime =
                    // Traer solo la fecha
                    d.getDate() +
                    '/' +
                    (d.getMonth() + 1) +
                    '/' +
                    d.getFullYear();
                console.log('array item: ', arrayItem.Usuario);
                console.log('Equiv:', obtainedEquivalenciaData);

                console.log(
                    arrayItem.Usuario.nombre + ' ' + arrayItem.Usuario.apellido
                );
                console.log(array);
                array.push(
                    createData(
                        //solicitante, dni, materia, id, dateTime, carrera
                        `${arrayItem.Usuario.nombre} ${arrayItem.Usuario.apellido}`,
                        arrayItem.Usuario.dni,
                        arrayItem.Materia_solicitadas[0].nombre,
                        arrayItem.id,
                        dateTime,
                        arrayItem.Carrera.nombre_carrera
                    )
                );
                // });
                console.log(arrayItem.id, 'array');
                const dataFilter = array.filter(
                    (d) =>
                        d.solicitante
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) +
                        d.dni
                            .toString()
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                );

                if (searchQuery) {
                    setRows(dataFilter);
                    setPage(0);
                } else {
                    setRows([...array]);
                }
            });
        };
        fetchEquivalenciaData();
    }, [searchQuery]);

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                borderRadius: '10px',
                boxShadow: 'none'
            }}
        >
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontWeight: 'bold'
                                    }}
                                    sx={{
                                        backgroundColor:
                                            'rgba(245, 245, 245, 0.7)',
                                        paddingTop: '20px'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{
                                                        paddingTop: '20px'
                                                    }}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count}`
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
