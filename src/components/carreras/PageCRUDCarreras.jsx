import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    IconButton,
    Modal,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    StandardInput
} from '../atoms/Input/InputMUI';
import { GridTop } from '../../GridTop';
import { Titulos } from '../atoms/Title/Titulos';
import { HeaderSuperUsuario } from '../HeaderSuperUsuario';
import { getCarreras, createCarrera, updateCarrera, deleteCarrera } from '../../services/carrera_service';
import { ModalEliminarCarrera, ModalEditarCarrera, ModalAgregarCarrera} from './Modals';


const PageCRUDCarreras = () => {
    const [carreraSeleccionada, setCarreraSeleccionada] = useState({
        nombre_carrera: '',
        nombre_instituto: '',
        id: ''
    })

    const seleccionarCarrera = (carrera, caso) => {
        setCarreraSeleccionada(carrera);
        (caso === 'Editar') ? handleOpenEditar() : handleOpenEliminar()
    }

    const [carreras, setCarreras] = useState([]);

    const columns = [
        {
            id: 'nombre_carrera',
            label: 'Carrera',
            minWidth: 140,
            align: 'center'
        },
        {
            id: 'nombre_instituto',
            label: 'Instituto',
            minWidth: 140,
            align: 'center'
        },
        {
            id: 'updatedAt',
            label: 'Fecha Actualizacion',
            minWidth: 140,
            align: 'center'
        }
    ];

    function formatearCelda(column, value) {
        if (column.id === 'updatedAt') {
            return convertUTCtoLocalTime(value);
        } else if (column.format && typeof value === 'number') {
            return column.format(value);
        } else {
            return value;
        }
    }

    function convertUTCtoLocalTime(utcDatetimeString) {
        const date = new Date(utcDatetimeString);
        return (
            date.toLocaleDateString() +
            ' - ' +
            date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })
        );
    }

    useEffect(() => {
        const fetchCarreras = async () => {
            const carreras_input = await getCarreras();
            setCarreras(carreras_input.data);
        };
        fetchCarreras();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setCarreraSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function createData(id, nombre_carrera, nombre_instituto, updatedAt) {
        return { id, nombre_carrera, nombre_instituto, updatedAt };
    }

    const rows = carreras.map((carrera) =>
        createData(
            carrera.id,
            carrera.nombre_carrera,
            carrera.nombre_instituto,
            carrera.updatedAt
        )
    );


    const [openAgregar, setOpenAgregar] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);

    const handleOpenAgregar = () => {
        setOpenAgregar(true);
    };
    const handleCloseAgregar = () => {
        setOpenAgregar(false);
    };
    const handleOpenEditar = () => {
        setOpenEditar(true);
    };
    const handleCloseEditar = () => {
        setOpenEditar(false);
    };
    const handleOpenEliminar = () => {
        setOpenEliminar(true);
    };
    const handleCloseEliminar = () => {
        setOpenEliminar(false);
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        let objCarrera = {
            id: carreraSeleccionada.id,
            nombre_carrera: carreraSeleccionada.nombre_carrera,
            nombre_instituto: carreraSeleccionada.nombre_instituto
        };
        console.log(objCarrera);
        setOpenEditar(false)

        updateCarrera(objCarrera).then((rpta) => {
            console.log(rpta);
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        let objCarrera = {
            id: carreraSeleccionada.id,
            activo: 0
        };
        setOpenEliminar(false)
        deleteCarrera(objCarrera).then((rpta) => {
            console.log(rpta, 'delete');
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let objCarrera = {
            nombre_carrera: carreraSeleccionada.nombre_carrera,
            nombre_instituto: carreraSeleccionada.nombre_instituto
        };
        setOpenAgregar(false)

        createCarrera(objCarrera).then((rpta) => {
            console.log(rpta);
        });
        console.log(carreras)
    };

    return (
        <Grid container>
            <Grid item container xs={12}>
                <HeaderSuperUsuario />
            </Grid>

            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ padding: '40px 0px' }}
            >
                <GridTop
                    item
                    container
                    xs={11.5}
                    md={7}
                    sx={{ padding: '0px 20px' }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Titulos component="h2" titulogrande>
                            Carreras
                        </Titulos>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleOpenAgregar}
                        >
                            Agregar Carrera
                        </Button>
                        <ModalAgregarCarrera 
                            openAgregar={openAgregar}
                            handleCloseAgregar={handleCloseAgregar}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                        ></ModalAgregarCarrera>
                    </Grid>

                </GridTop>

                <Grid
                    item
                    container
                    xs={11.5}
                    md={7}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 5 }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
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

                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {formatearCelda(column, value)}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell>

                                                    <IconButton onClick={() => seleccionarCarrera(row, 'Editar')} aria-label="edit">
                                                        <EditIcon
                                                        />
                                                    </IconButton>
                                                    <ModalEditarCarrera
                                                        openEditar={openEditar}
                                                        handleCloseEditar={handleCloseEditar}
                                                        handleUpdate={handleUpdate}
                                                        handleChange={handleChange}
                                                        carreraSeleccionada={carreraSeleccionada}
                                                    ></ModalEditarCarrera>

                                                    <IconButton aria-label="delete" onClick={() => seleccionarCarrera(row, 'Eliminar')}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <ModalEliminarCarrera
                                                        openEliminar={openEliminar}
                                                        handleCloseEliminar={handleCloseEliminar}
                                                        handleDelete={handleDelete}
                                                    ></ModalEliminarCarrera>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export { PageCRUDCarreras };