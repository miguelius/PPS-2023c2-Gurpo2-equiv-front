import { Grid, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Header } from '../../molecules/Header';
import { Titulos } from '../../atoms/Title/Titulos';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BotonMUI } from '../../atoms/Button/BotonMUI';
import { StandardInput } from '../../atoms/Input/InputMUI';
import { OuterFormButtons } from '../../molecules/OuterFormButtons';
import { getEquivalencia } from '../../../services/revision';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../../config/config';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { Chat } from '../../molecules/Chat';
import { Item } from '../../atoms/Item/Item';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PageRevision = ({ rol }) => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [equiv, setEquiv] = useState({});
    const [formValue, setFormValue] = useState({
        materias: [
            {
                id: '',
                estado: ''
            }
        ],
        observaciones: ''
    });
    const columns = [
        { id: 'desc', label: 'Solicitante' },
        { id: 'state', label: 'DNI' },
        { id: 'carreer', label: 'Carrera' },
        { id: 'dateTime', label: 'Email' },
        { id: 'phone', label: 'Teléfono' },
        { id: 'actions', label: 'Fecha' }
    ];

    const createData = (
        solicitante,
        email,
        carrera,
        dni,
        fechaHora,
        telefono
    ) => {
        return { solicitante, email, carrera, dni, fechaHora, telefono };
    };

    const cambiarEstado = (event, idMateria) => {
        const solicitudes = [].concat(formValue.materias);
        formValue.materias.find((materia) => materia.id === idMateria).estado =
            event.target.value;
        solicitudes.find((solicitud) => solicitud.id === idMateria).estado =
            event.target.value;
        setEquiv((equiv) => ({
            ...equiv,
            materiasSolicitadas: solicitudes
        }));
        setFormValue((formValue) => ({
            ...formValue,
            materias: solicitudes
        }));
    };

    const notifyExito = () => {
        toast.success('Equivalencia modificada con éxito', {
            containerId: 'home',
            position: 'bottom-left',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setTimeout(() => {
            window.location = '/direccion/solicitudes';
        }, 1000);
    };

    const handleSubmit = async () => {
        formValue.materias.forEach(async (materia) => {
            const equivalencia = {
                estado: materia.estado
            };
            if (equivalencia) {
                const response = await axios
                    .put(
                        `${config.apiUrl}/materias_solicitadas/` + materia.id,
                        equivalencia
                    )
                    .then((res) => {
                        try {
                            res.data.data;
                        } catch (error) {
                            console.error(error);
                        }
                    })
                    .catch(() => {});
            }
        });
        setTimeout(async () => {
            let state = '';
            if (equiv.materiasSolicitadas.length > 0) {
                const pendientes = equiv.materiasSolicitadas.filter(
                    (materia) => materia.estado === 'pendiente'
                );
                if (pendientes.length === 0) {
                    state = 'Cerrado';
                } else if (
                    pendientes.length === equiv.materiasSolicitadas.length
                ) {
                    state = 'Pendiente';
                } else {
                    state = 'Abierto';
                }
                const solicitud = {
                    estado: state,
                    observaciones: formValue.observaciones
                };
                const response = await axios
                    .put(`${config.apiUrl}/equivalencias/` + id, solicitud)
                    .then((res) => {
                        try {
                            res.data.data;
                            notifyExito();
                        } catch (error) {
                            console.error(error);
                        }
                    })
                    .catch(() => {});
            } else {
                notifyExito();
            }
        }, 1000);
    };

    const renderStatus = (materia) => {
        let salida;
        if (rol === 'alumno') {
            salida = (
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        pointerEvents: 'none',
                        width: '10rem',
                        backgroundColor:
                            materia.estado === 'aceptado'
                                ? '#009673'
                                : materia.estado === 'rechazado'
                                ? '#DB0505'
                                : '#2A74E4',
                        color: '#FFFFFF'
                    }}
                >
                    {materia.estado}
                </Button>
            );
        } else {
            salida = (
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    autoWidth="true"
                    onChange={(event) => cambiarEstado(event, materia.id)}
                    defaultValue="pendiente"
                    value={materia.estado}
                    size="small"
                    sx={{
                        width: '10rem',
                        backgroundColor:
                            materia.estado === 'aceptado'
                                ? '#009673'
                                : materia.estado === 'rechazado'
                                ? '#DB0505'
                                : '#2A74E4',
                        color: '#FFFFFF'
                    }}
                >
                    <MenuItem value="aceptado">Aceptado</MenuItem>
                    <MenuItem value="pendiente">Pendiente</MenuItem>
                    <MenuItem value="rechazado">Rechazado</MenuItem>
                </Select>
            );
        }
        return salida;
    };

    useEffect(() => {
        const fetchData = async () => {
            const equivalenciasResponse = await getEquivalencia(id);
            let dateAux = new Date(equivalenciasResponse.createdAt);
            let date =
                dateAux.getDate() +
                '/' +
                (dateAux.getMonth() + 1) +
                '/' +
                dateAux.getFullYear();
            const carrera =
                equivalenciasResponse.Materias_solicitadas.length > 0
                    ? equivalenciasResponse.carrera
                    : '';

            const userData = createData(
                equivalenciasResponse.Usuario.nombre +
                    ' ' +
                    equivalenciasResponse.Usuario.apellido,
                equivalenciasResponse.Usuario.email,
                carrera,
                equivalenciasResponse.Usuario.dni,
                date,
                equivalenciasResponse.Usuario.telefono
            );
            setUser(userData);

            const equivData = {
                materiasAprobadas: equivalenciasResponse.Materias_aprobadas,
                materiasSolicitadas: equivalenciasResponse.Materias_solicitadas,
                observaciones: equivalenciasResponse.observaciones
            };
            setEquiv(equivData);

            if (equivalenciasResponse.Materias_solicitadas.length > 0) {
                const materias = [];
                equivalenciasResponse.Materias_solicitadas.forEach(
                    (materia) => {
                        materias.push({
                            id: materia.id,
                            estado: materia.estado
                        });
                    }
                );
                setFormValue({
                    materias: materias,
                    observaciones: equivalenciasResponse.observaciones,
                    instituto: equivalenciasResponse.instituto
                });
            }
        };
        fetchData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
            {/*Header de perfil*/}
            <Grid container item xs={12}>
                <Header
                    item
                    name="Equivalencias"
                    paginaPrincipal="/direccion/solicitudes"
                    botonSeleccionado="rgba(255, 255, 255, 0.1);"
                />
            </Grid>
            {/*Contenedor general*/}
            <Grid paddingX={5} paddingTop={4}>
                {/*Titulo principal*/}
                <Grid item lg={12}>
                    <Titulos
                        component="h2"
                        titulogrande="true"
                        sx={{
                            textAlign: {
                                xs: 'center',
                                lg: 'left'
                            }
                        }}
                    >
                        Revisión
                    </Titulos>
                </Grid>
                <Grid container spacing={6} paddingTop={2}>
                    <Grid item xs={12} sm={12} md={12} lg={9}>
                        <Item>
                            <Grid item container width="100%" height="100%">
                                {/* Informacion */}
                                <Paper
                                    sx={{
                                        width: '100%',
                                        overflow: 'hidden',
                                        borderRadius: '10px 10px 0px 0px',
                                        boxShadow: 'none',
                                        height: '17%',
                                        borderBottom: '2px solid #dadce0'
                                    }}
                                >
                                    <TableContainer>
                                        <Table
                                            stickyHeader
                                            aria-label="sticky table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align="center"
                                                            style={{
                                                                minWidth:
                                                                    column.minWidth,
                                                                backgroundColor:
                                                                    'Azure'
                                                            }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    key={user.dni}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': {
                                                            border: 0
                                                        }
                                                    }}
                                                >
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {user.solicitante}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {user.dni}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {user.carrera}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {user.telefono}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {user.fechaHora}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>

                                {/* Universidad Unahur*/}

                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        lg={10}
                                        sx={{
                                            padding: {
                                                xs: '0px 30px',
                                                lg: '0px 60px'
                                            }
                                        }}
                                    >
                                        <Titulos
                                            titulolabel="true"
                                            sx={{
                                                textAlign: {
                                                    lg: 'left'
                                                }
                                            }}
                                        >
                                            Materias solicitadas de la UNAHUR
                                        </Titulos>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        lg={2}
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                lg: 'inline'
                                            },
                                            padding: {
                                                xs: '0rem 2rem',
                                                lg: '0rem 1rem 0rem 1rem'
                                            }
                                        }}
                                    >
                                        <Titulos
                                            titulolabel="true"
                                            textAlign="left"
                                        >
                                            Estado
                                        </Titulos>
                                    </Grid>
                                </Grid>
                                <Grid container overflow="auto" maxHeight={200}>
                                    {equiv.materiasSolicitadas !== undefined ? (
                                        equiv.materiasSolicitadas.map(
                                            (materia) => {
                                                return (
                                                    <>
                                                        {/*Equivalencias solicitadas*/}
                                                        <Grid
                                                            item
                                                            lg={10}
                                                            xs={12}
                                                            sx={{
                                                                padding: {
                                                                    xs:
                                                                        '0px 30px',
                                                                    lg:
                                                                        '0px 60px'
                                                                }
                                                            }}
                                                        >
                                                            <StandardInput
                                                                inputFocused
                                                                name="materiaSolicitada"
                                                                value={
                                                                    materia.nombre
                                                                }
                                                                variant="outlined"
                                                                focused={true}
                                                                size="small"
                                                                InputProps={{
                                                                    readOnly: true
                                                                }}
                                                            />
                                                        </Grid>
                                                        {/*Estados*/}
                                                        <Grid
                                                            container
                                                            item
                                                            lg={2}
                                                            xs={12}
                                                            sx={{
                                                                padding: {
                                                                    xs:
                                                                        '0rem 2rem',
                                                                    lg:
                                                                        '0rem 1rem 0rem 1rem'
                                                                }
                                                            }}
                                                            marginTop="1rem"
                                                            alignItems="flex-start"
                                                        >
                                                            {renderStatus(
                                                                materia
                                                            )}
                                                        </Grid>
                                                    </>
                                                );
                                            }
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </Grid>

                                {/* Universidad Origen */}
                                <Grid width="100%">
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            marginTop: '10px',
                                            borderTop: '2px solid #dadce0',
                                            padding: {
                                                xs: '0px 30px',
                                                lg: '0px 60px'
                                            }
                                        }}
                                    >
                                        <Titulos
                                            titulolabel="true"
                                            sx={{
                                                textAlign: {
                                                    lg: 'left'
                                                }
                                            }}
                                        >
                                            Materias aprobadas
                                        </Titulos>
                                    </Grid>
                                    <Grid overflow="auto" maxHeight={200}>
                                        {equiv.materiasAprobadas !==
                                        undefined ? (
                                            equiv.materiasAprobadas.map(
                                                (materiaAprobada) => {
                                                    return (
                                                        <>
                                                            <Grid
                                                                item
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-start"
                                                                alignItems="center"
                                                                className="universidad-origen"
                                                                sm={12}
                                                                padding={{
                                                                    xs:
                                                                        '0px 30px',
                                                                    lg:
                                                                        '10px 60px'
                                                                }}
                                                                sx={{
                                                                    height:
                                                                        'auto',
                                                                    borderRadius:
                                                                        '10px 10px 0px 0px',
                                                                    borderBottom:
                                                                        '1px solid #dadce0'
                                                                }}
                                                            >
                                                                <Grid
                                                                    item
                                                                    container
                                                                    xs={12}
                                                                    direction="row"
                                                                    justifyContent="space-between"
                                                                    alignItems="flex-start"
                                                                >
                                                                    <Grid
                                                                        item
                                                                        container
                                                                        direction="column"
                                                                        alignItems="flex-start"
                                                                        xs={12}
                                                                        md={12}
                                                                        lg={5.8}
                                                                        sx={{
                                                                            marginTop:
                                                                                '6px'
                                                                        }}
                                                                    >
                                                                        <StandardInput
                                                                            inputFocused
                                                                            name="materiaAprobada"
                                                                            size="small"
                                                                            label="Materia aprobada"
                                                                            value={
                                                                                materiaAprobada.nombre_materia
                                                                            }
                                                                            variant="outlined"
                                                                            focused={
                                                                                true
                                                                            }
                                                                            InputProps={{
                                                                                readOnly: true
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid
                                                                        item
                                                                        container
                                                                        md={12}
                                                                        lg={5.8}
                                                                        sx={{
                                                                            marginTop:
                                                                                '6px'
                                                                        }}
                                                                    >
                                                                        <StandardInput
                                                                            inputFocused
                                                                            label="Universidad de Origen"
                                                                            name="universidadOrigen"
                                                                            value={
                                                                                'Universidad de la Matanza'
                                                                            }
                                                                            variant="outlined"
                                                                            size="small"
                                                                            focused={
                                                                                true
                                                                            }
                                                                            InputProps={{
                                                                                readOnly: true
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>

                                                                {/* Datos extra */}
                                                                <Grid
                                                                    item
                                                                    container
                                                                    direction="row"
                                                                    alignItems="flex-start"
                                                                    width="100%"
                                                                >
                                                                    <Grid
                                                                        item
                                                                        container
                                                                        direction="row"
                                                                        alignItems="flex-start"
                                                                        sx={{
                                                                            marginTop:
                                                                                '10px',
                                                                            marginRight:
                                                                                '10px'
                                                                        }}
                                                                        width="100%"
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            container
                                                                            xs={
                                                                                3
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }
                                                                            alignItems="flex-start"
                                                                        >
                                                                            <StandardInput
                                                                                inputFocused
                                                                                label="Año aprobación"
                                                                                name="anioAprobacion"
                                                                                value={new Date(
                                                                                    materiaAprobada.año_aprobacion
                                                                                ).getFullYear()}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                focused={
                                                                                    true
                                                                                }
                                                                                InputProps={{
                                                                                    readOnly: true
                                                                                }}
                                                                            />
                                                                        </Grid>

                                                                        <Grid
                                                                            item
                                                                            container
                                                                            xs={
                                                                                3
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }
                                                                            alignItems="flex-start"
                                                                            marginLeft="2%"
                                                                            width="100%"
                                                                        >
                                                                            <StandardInput
                                                                                inputFocused
                                                                                label="Nota aprobación"
                                                                                name="notaAprobacion"
                                                                                value={
                                                                                    materiaAprobada.nota
                                                                                }
                                                                                variant="outlined"
                                                                                size="small"
                                                                                focused={
                                                                                    true
                                                                                }
                                                                                InputProps={{
                                                                                    readOnly: true
                                                                                }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            container
                                                                            xs={
                                                                                3
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }
                                                                            alignItems="flex-start"
                                                                            marginLeft="2%"
                                                                            width="100%"
                                                                        >
                                                                            <StandardInput
                                                                                inputFocused
                                                                                label="Certificado"
                                                                                name="notaAprobacion"
                                                                                value={
                                                                                    materiaAprobada.certificado
                                                                                        ? 'Sí'
                                                                                        : 'No'
                                                                                }
                                                                                variant="outlined"
                                                                                size="small"
                                                                                focused={
                                                                                    true
                                                                                }
                                                                                InputProps={{
                                                                                    readOnly: true
                                                                                }}
                                                                            />
                                                                        </Grid>

                                                                        <Grid
                                                                            item
                                                                            container
                                                                            width="100%"
                                                                            xs={
                                                                                12
                                                                            }
                                                                            lg={
                                                                                4
                                                                            }
                                                                            sx={{
                                                                                marginBottom:
                                                                                    '10px',
                                                                                marginTop:
                                                                                    '20px',
                                                                                marginLeft: {
                                                                                    lg:
                                                                                        '2%',
                                                                                    xs:
                                                                                        '0%'
                                                                                }
                                                                            }}
                                                                        >
                                                                            <Titulos
                                                                                titulolabel="true"
                                                                                variant="h5"
                                                                                fontSize={{
                                                                                    xs:
                                                                                        '16px',
                                                                                    sm:
                                                                                        '18px'
                                                                                }}
                                                                                marginTop="2px"
                                                                                marginRight="5px"
                                                                            >
                                                                                Programa:
                                                                            </Titulos>
                                                                            <label htmlFor="contained-button-file">
                                                                                <BotonMUI
                                                                                    buttondownload="true"
                                                                                    variant="outlined"
                                                                                >
                                                                                    Descargar
                                                                                </BotonMUI>
                                                                            </label>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    {/* Chat */}
                    <Grid item xs={12} sm={12} md={12} lg={3}>
                        <Item>
                            <Chat
                                observaciones={formValue.observaciones}
                            ></Chat>
                        </Item>
                    </Grid>
                </Grid>
                {/* Footer */}
                <Grid
                    item
                    container
                    justifyContent="space-between"
                    lg={8.9}
                    marginTop="1rem"
                >
                    {rol === 'directivo' ? (
                        <OuterFormButtons
                            handleSubmit={handleSubmit}
                            path={'/direccion/solicitudes'}
                            titulo={'Descartar revisión'}
                            mensaje={
                                '¿Está seguro/a de que desea descartar la revisión de la solicitud?'
                            }
                            revision={true}
                        />
                    ) : (
                        <Grid item container xs={1} lg={1}>
                            <Link
                                to={'/usuario/equivalencias/'}
                                style={{
                                    textDecoration: 'none',
                                    width: '100%'
                                }}
                                sx={{
                                    marginRight: '12px'
                                }}
                            >
                                <BotonMUI
                                    buttoncontainedsmall="+true"
                                    sx={{
                                        marginRight: '12px',
                                        width: '100%'
                                    }}
                                >
                                    Volver
                                </BotonMUI>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
export { PageRevision };
