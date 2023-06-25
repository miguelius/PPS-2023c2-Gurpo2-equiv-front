import React from 'react';
import { useEffect, useState } from 'react';
import { getInsitutciones } from '../../../services/institucionService';
import { ContainerTitle } from './InstitucionesStyled';
import { ContainerCenter, ContainerPagination } from './InstitucionesStyled';
import { Grid, Button, IconButton } from '@mui/material';
import { Header } from '../../../Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageInstituciones = () => {
    const [listaInstituciones, setListaInstituciones] = useState([]);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(1);

    //falta funcion de mapeo para que se agregue el boton q redirica a editar institucion
    function handleChangePage(event, newpage) {
        setCurrentPage(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setLimit(parseInt(event.target.value, 10));
    }

    useEffect(() => {
        console.log('ENTRE AL USE EFFECT');
        const fetchInstituciones = async () => {
            console.log('Por hacer el llamado');
            const instituciones = await getInsitutciones({
                limit: limit,
                page: currentPage
            });
            console.log('INSTITUCIONES', instituciones);
            const institucionesListadas = instituciones.items;
            console.log('INSTITUCIONES LISTADAS', institucionesListadas);
            setListaInstituciones(institucionesListadas);
            setTotalPages(instituciones.totalPages);
            setTotalElements(instituciones.totalItems);
        };
        fetchInstituciones();
    }, [currentPage, limit]);
    console.log('LLEGUE A LA PAGINA');
    console.log('LISTA INSTITUCIONES', listaInstituciones);
    return (
        <Grid container direction="column">
            <Grid item container xs={12}>
                <Header name="Instituciones" paginaPrincipal="/" />
            </Grid>

            <Grid container spacing={1} xs={12}>
                <ContainerTitle sx={{ paddingTop: '2rem' }}>
                    <Typography variant="h3" component="h1">
                        Instituciones registradas
                    </Typography>
                </ContainerTitle>

                <ContainerCenter>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#171E27' }}>
                                    <TableCell
                                        sx={{ color: '#F9F3EE' }}
                                        align="left"
                                    >
                                        ID
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: '#F9F3EE' }}
                                        align="left"
                                    >
                                        Nombre de institución
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: '#F9F3EE' }}
                                        align="left"
                                    >
                                        Localidad
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: '#F9F3EE' }}
                                        align="left"
                                    >
                                        Sigla
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: '#F9F3EE' }}
                                        align="left"
                                    >
                                        Estado
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: '#F9F3EE' }}
                                        align="left"
                                    >
                                        Opciones
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaInstituciones.map((instituciones) => (
                                    <TableRow
                                        key={instituciones.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0
                                            }
                                        }}
                                    >
                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                        >
                                            {instituciones.id}
                                        </TableCell>
                                        <TableCell align="left">
                                            {instituciones.nombre_universidad}
                                        </TableCell>
                                        <TableCell align="left">
                                            {instituciones.localidad}
                                        </TableCell>
                                        <TableCell align="left">
                                            {instituciones.sigla}
                                        </TableCell>
                                        {instituciones.disabled === true ? (
                                            <TableCell align="left">
                                                Deshabilitada
                                            </TableCell>
                                        ) : (
                                            <TableCell align="left">
                                                Habilitada
                                            </TableCell>
                                        )}
                                        <TableCell align="left">
                                            <Link
                                                to={`/instituciones/editarInstitucion/${instituciones.id}`}
                                            >
                                                <Button variant="contained">
                                                    Editar
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ContainerCenter>
                <ContainerPagination>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </ContainerPagination>
            </Grid>
        </Grid>
    );
};
export default PageInstituciones;
