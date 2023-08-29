import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const TablaUsuarios = (props) => {
    const { rol, usuarios, buscador } = props;

    const columns = [
        {
            id: 'nombre',
            label: 'Nombre usuario',
            minWidth: 140,
            align: 'center'
        },
        { id: 'dni', label: 'DNI', minWidth: 140, align: 'center' },
        {
            id: 'email',
            label: 'Email',
            minWidth: 140,
            align: 'center'
        },
        {
            id: 'telefono',
            label: 'Telefono',
            minWidth: 140,
            align: 'center'
        },
        {
            id: 'rolUsuario',
            label: 'Rol',
            minWidth: 140,
            align: 'center'
        }
    ];
    function createData(nombre, dni, email, telefono, rolUsuario) {
        return { nombre, dni, email, telefono, rolUsuario };
    }
    const rows = usuarios.map((usuario) =>
        createData(
            usuario.nombre + ' ' + usuario.apellido,
            usuario.dni,
            usuario.email,
            usuario.telefono,
            usuario.rol
        )
    );
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filtrarPorRol = (rolUsuario) => {
        if (rolUsuario === 'directivo') {
            return rows.filter((row) => row.rolUsuario === 'directivo');
        } else if (rolUsuario === 'alumno') {
            return rows.filter((row) => row.rolUsuario === 'alumno');
        } else {
            return rows;
        }
    };

    const filtrarPorBuscador = (buscador) => {
        return rows.filter(
            (row) =>
                row.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
                row.dni
                    .toString()
                    .toLowerCase()
                    .includes(buscador.toLowerCase())
        );
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 5 }}>
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
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtrarPorRol(rol)
                            .filter((row) =>
                                filtrarPorBuscador(buscador).includes(row)
                            )
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        rolUsuarioe="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
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
};

export default TablaUsuarios;
