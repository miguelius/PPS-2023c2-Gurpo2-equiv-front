import { Collapse, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Titulos } from '../../atoms/Title/Titulos';
import { GridTop } from '../../atoms/GridTop';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BotonMUI } from '../../atoms/Button/BotonMUI';
import { StandardInput } from '../../atoms/Input/InputMUI';
import Typography from '@mui/material/Typography';
import { OuterFormButtons } from '../../molecules/OuterFormButtons';
import { getEquivalencia } from '../../../services/revision';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../../config/config';
import { ArchivoEquivalencia } from '../../molecules/ArchivoEquivalencia';
import { HeaderDirectivo } from '../../molecules/HeaderDirectivo';
import { HeaderSuperUsuario } from '../../molecules/HeaderSuperUsuario';
import Chat from '../../chat/Chat';
import { Button, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Header } from '../../molecules/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const horaConCero = (hora) => {
    if (hora < 10) {
        return `0${hora}`;
    } else {
        return hora;
    }
};

const PageRevision = ({ socket }) => {
    const { id } = useParams();
    const rol = JSON.parse(localStorage.getItem('rol'));
    const [user, setUser] = useState([]);
    const [rows, setRows] = useState([]);
    const [equiv, setEquiv] = useState({});
    const [alignment, setAlignment] = useState('web');
    const [mostrarChat, setMostrarChat] = useState(false);
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
    console.log(rol);

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

    const handleMostrarChat = () => {
        setMostrarChat(!mostrarChat);
    };

    useEffect(() => {
        const fetchUsuarioData = async () => {
            const obtainedUsuarioData = await getEquivalencia(id);
            let arrayData = [];

            let d = new Date(obtainedUsuarioData.createdAt);
            let dateTime =
                d.getDate() +
                '/' +
                (d.getMonth() + 1) +
                '/' +
                d.getFullYear() +
                ' - ' +
                d.getHours() +
                ':' +
                horaConCero(d.getMinutes());

            arrayData.push(
                createData(
                    obtainedUsuarioData.Usuario.nombre +
                        ' ' +
                        obtainedUsuarioData.Usuario.apellido,
                    obtainedUsuarioData.Usuario.email,
                    obtainedUsuarioData.Usuario.dni,
                    dateTime,
                    obtainedUsuarioData.Usuario.telefono
                )
            );

            setRows(arrayData);

            //console.log('Hola' + equiv.instituto);
            console.log('obtainedusuario:', obtainedUsuarioData.Usuario.nombre);
        };

        fetchUsuarioData();
    }, []);

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
                equivalenciasResponse.Materia_solicitadas.length > 0
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
                materiasAprobadas: equivalenciasResponse.Materia_aprobadas,
                materiasSolicitadas: equivalenciasResponse.Materia_solicitadas,
                observaciones: equivalenciasResponse.observaciones
            };
            setEquiv(equivData);

            if (equivalenciasResponse.Materia_solicitadas.length > 0) {
                const materias = [];
                equivalenciasResponse.Materia_solicitadas.forEach((materia) => {
                    materias.push({
                        id: materia.id,
                        estado: materia.estado
                    });
                });
                setFormValue({
                    materias: materias,
                    observaciones: equivalenciasResponse.observaciones,
                    instituto: equivalenciasResponse.instituto
                });
            }
        };
        fetchData();
    }, []);

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
                    instituto: formValue.instituto,
                    estado: state,
                    observaciones: formValue.observaciones,
                    solicitante: user.solicitante,
                    email: user.email
                };
                console.log('la solicitud es: ', solicitud);
                const response = await axios
                    .put(`${config.apiUrl}/equivalencias/` + id, solicitud)
                    .then((res) => {
                        try {
                            res.data.data;
                            notifyExito();
                        } catch (error) {
                            console.error('Hubo un error: ' + error);
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

    //const rolUsuario = () => {
    //    if (rol === 'directivo') {
    //        return <HeaderDirectivo />;
    //    } else {
    //        return <HeaderSuperUsuario />;
    //    }
    //};
    const urlUsuario = () => {
        if (rol === 'directivo') {
            return '/direccion/solicitudes';
        }
        if (rol === 'alumno') {
            return '/usuario/equivalencias';
        } else {
            return '/superusuario/solicitudes';
        }
    };

    return (
        <>
            <Grid container direction="column">
                <Grid item container xs={12}>
                    {/*rolUsuario()*/}
                    <Header name="Instituciones" paginaPrincipal="/" />
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
                        sx={{
                            padding: '0px 20px'
                        }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Link to={urlUsuario}>
                                <IconButton sx={{ padding: 0 }}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Link>
                            <Titulos component="h2" titulogrande>
                                Revisión
                            </Titulos>
                        </Grid>
                    </GridTop>

                    <GridTop
                        item
                        container
                        blanco
                        xs={11.5}
                        md={7}
                        sx={{
                            height: 'auto'
                        }}
                    >
                        <Paper
                            sx={{
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: '10px 10px 0px 0px',
                                boxShadow: 'none',
                                borderBottom: '1px solid #dadce0'
                            }}
                        >
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align="center"
                                                    style={{
                                                        minWidth:
                                                            column.minWidth
                                                    }}
                                                    sx={{
                                                        backgroundColor:
                                                            '#FBFBFB',
                                                        padding: '16px 60px'
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
                                                '&:last-child td, &:last-child th':
                                                    {
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
                                <Titulos titulolabel="true" textAlign="left">
                                    Estado
                                </Titulos>
                            </Grid>
                        </Grid>
                        <Grid container overflow="auto" maxHeight={200}>
                            {equiv.materiasSolicitadas !== undefined ? (
                                equiv.materiasSolicitadas.map((materia) => {
                                    return (
                                        <>
                                            {/*Equivalencias solicitadas*/}
                                            <Grid
                                                item
                                                lg={10}
                                                xs={12}
                                                sx={{
                                                    padding: {
                                                        xs: '0px 30px',
                                                        lg: '0px 60px'
                                                    }
                                                }}
                                            >
                                                <StandardInput
                                                    inputFocused
                                                    name="materiaSolicitada"
                                                    value={materia.nombre}
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
                                                        xs: '0rem 2rem',
                                                        lg: '0rem 1rem 0rem 1rem'
                                                    }
                                                }}
                                                marginTop="1rem"
                                                alignItems="flex-start"
                                            >
                                                {renderStatus(materia)}
                                            </Grid>
                                        </>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </Grid>
                        {/* Universidad Origen */}

                        {equiv.materiasAprobadas !== undefined ? (
                            equiv.materiasAprobadas.map((materiaAprobada) => {
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
                                                xs: '20px 30px',
                                                sm: '20px 60px'
                                            }}
                                            sx={{
                                                height: 'auto',
                                                borderRadius:
                                                    '10px 10px 0px 0px',
                                                borderBottom:
                                                    '1px solid #dadce0'
                                            }}
                                        >
                                            <Grid
                                                item
                                                container
                                                direction="column"
                                                alignItems="flex-start"
                                                md={12}
                                                lg={5.8}
                                                sx={{
                                                    marginTop: '6px'
                                                }}
                                            >
                                                <Titulos
                                                    titulolabel
                                                    component="h2"
                                                >
                                                    Datos Universidad de Origen
                                                </Titulos>
                                            </Grid>

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
                                                    md={12}
                                                    lg={5.8}
                                                    sx={{
                                                        marginTop: '6px'
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
                                                        focused={true}
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
                                                        marginTop: '6px'
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
                                                        focused={true}
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
                                                xs={12}
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="flex-start"
                                            >
                                                <Grid
                                                    item
                                                    container
                                                    md={12}
                                                    lg={5.8}
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="flex-start"
                                                    sx={{
                                                        marginTop: '10px'
                                                    }}
                                                >
                                                    <Grid
                                                        item
                                                        container
                                                        xs={5.6}
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
                                                            focused={true}
                                                            InputProps={{
                                                                readOnly: true
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        container
                                                        xs={5.6}
                                                    >
                                                        <StandardInput
                                                            inputFocused
                                                            label="Carga horaria total"
                                                            name="cargaHorariaTotal"
                                                            value={
                                                                materiaAprobada.carga_horaria
                                                            }
                                                            variant="outlined"
                                                            size="small"
                                                            focused={true}
                                                            InputProps={{
                                                                readOnly: true
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid
                                                    item
                                                    container
                                                    md={12}
                                                    lg={5.8}
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="flex-start"
                                                    sx={{
                                                        marginTop: '10px'
                                                    }}
                                                >
                                                    <Grid
                                                        item
                                                        container
                                                        xs={5.6}
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
                                                            focused={true}
                                                            InputProps={{
                                                                readOnly: true
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        container
                                                        justifyContent="center"
                                                        alignItems="flex-end"
                                                        xs={5.6}
                                                        marginTop="7px"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            gutterBottom
                                                        >
                                                            {materiaAprobada.certificado ? (
                                                                <p>
                                                                    Tiene
                                                                    certificado
                                                                </p>
                                                            ) : (
                                                                <p>
                                                                    No tiene
                                                                    certificado
                                                                </p>
                                                            )}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid
                                                    item
                                                    container
                                                    xs={12}
                                                    sx={{
                                                        marginTop: '16px'
                                                    }}
                                                >
                                                    <ArchivoEquivalencia
                                                        nArchivo={
                                                            materiaAprobada.archivo
                                                        }
                                                        estado={
                                                            formValue.estado
                                                        }
                                                    ></ArchivoEquivalencia>

                                                    {/* </Grid> */}
                                                </Grid>

                                                {/* <AgregarMateriaUniOrigen /> */}
                                            </Grid>
                                        </Grid>
                                    </>
                                );
                            })
                        ) : (
                            <></>
                        )}

                        {/* Textarea */}

                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            sm={12}
                            padding={{
                                xs: '20px 30px',
                                sm: '20px 60px'
                            }}
                            sx={{
                                height: 'auto',
                                borderRadius: '10px 10px 0px 0px'
                            }}
                        >
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                sm={12}
                            >
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sm={12}
                                >
                                    <Button
                                        onClick={handleMostrarChat}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#009673',
                                            ':hover': {
                                                backgroundColor: '#009674'
                                            }
                                        }}
                                    >
                                        {mostrarChat
                                            ? 'Ocultar chat'
                                            : 'Mostrar chat'}
                                    </Button>

                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        sm={12}
                                        sx={{
                                            '& > :not(style)': {
                                                width: '100%'
                                            }
                                        }}
                                    >
                                        <Collapse in={mostrarChat}>
                                            <Chat id={id} socket={socket} />
                                        </Collapse>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    justifyContent="space-between"
                                    lg={8.9}
                                    marginTop="1rem"
                                >
                                    {rol === 'directivo' ||
                                    rol === 'superusuario' ? (
                                        <OuterFormButtons
                                            handleSubmit={handleSubmit}
                                            path={urlUsuario}
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
                        </Grid>
                    </GridTop>
                </Grid>
            </Grid>
        </>
    );
};

export { PageRevision };
