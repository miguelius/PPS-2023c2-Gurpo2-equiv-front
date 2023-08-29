import { Collapse, Grid } from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import { Titulos } from '../../atoms/Title/Titulos';
import { GridTop } from '../../../GridTop';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { OuterFormButtons } from '../../../OuterFormButtons';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { getEquivalencia } from '../../../services/revision';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../../config/config';
import { ArchivoEquivalencia } from '../../../ArchivoEquivalencia';
import { HeaderDirectivo } from '../../HeaderDirectivo';
import { HeaderSuperUsuario } from '../../HeaderSuperUsuario';
import Chat from '../../chat/Chat';
import { Button } from '@mui/material';

const columns = [
    { id: 'desc', label: 'Solicitante', minWidth: 170 },
    { id: 'dateTime', label: 'Email', minWidth: 100 },
    { id: 'state', label: 'DNI', minWidth: 170 },
    { id: 'actions', label: 'Fecha', minWidth: 170 },
    { id: 'phone', label: 'Teléfono', minWidth: 170 }
];

function createData(solicitante, email, dni, fechaHora, telefono) {
    return { solicitante, email, dni, fechaHora, telefono };
}

function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = useMemo(() => {
        if (focused) {
            return 'This field is being focused';
        }

        return 'Helper text';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
}

const horaConCero = (hora) => {
    if (hora < 10) {
        return `0${hora}`;
    } else {
        return hora;
    }
};

const PageRevision = ({ socket }) => {
    const { id } = useParams();
    const [rows, setRows] = useState([]);
    const [equiv, setEquiv] = useState({});
    const [alignment, setAlignment] = useState('web');
    const [formValue, setFormValue] = useState({});
    const [mostrarChat, setMostrarChat] = useState(false);

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
        const fetchEquivalenciaData = async () => {
            // Aca tambien incluir carreras.
            const obtainedEquivalenciaData = await getEquivalencia(id);

            let arrayData = {
                nombre: obtainedEquivalenciaData.Materia_solicitadas[0].nombre,

                carrera: obtainedEquivalenciaData.Carrera.nombre_carrera,

                materiasAprobadas: obtainedEquivalenciaData.Materia_aprobadas,

                observaciones: obtainedEquivalenciaData.observaciones
            };

            setEquiv(arrayData);

            setFormValue({
                observaciones: obtainedEquivalenciaData.observaciones,
                estado: obtainedEquivalenciaData.estado,
                instituto: obtainedEquivalenciaData.instituto
            });

            console.log(obtainedEquivalenciaData);
            //console.log('Hola' + arrayData.nombre_materia);
        };

        fetchEquivalenciaData();
    }, []);

    const handleChange = (event) => {
        setFormValue((equiv) => ({
            ...equiv,
            [event.target.name]: event.target.value
        }));
        console.log(formValue);
    };

    const handleChangeToggle = (event, newAlignment) => {
        setFormValue((equiv) => ({
            ...equiv,
            [event.target.id]: event.target.value
        }));
        console.log(formValue);

        setAlignment(newAlignment);
    };

    const handleSubmit = async () => {
        const equivalencia = {
            observaciones: formValue.observaciones,
            estado: formValue.estado,
            instituto: formValue.instituto,
            email: rows[0].email,
            solicitante: rows[0].solicitante
        };

        const res = await axios
            .put(`${config.apiUrl}/equivalencias/` + id, equivalencia)
            .then((res) => {
                try {
                    res.data.data; // '{"name":"deven"}'

                    window.location = urlUsuario();
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(() => {});
    };
    const rol = JSON.parse(localStorage.getItem('rol'));
    const rolUsuario = () => {
        if (rol === 'directivo') {
            return <HeaderDirectivo />;
        } else {
            return <HeaderSuperUsuario />;
        }
    };
    const urlUsuario = () => {
        if (rol === 'directivo') {
            return '/direccion/solicitudes';
        } else {
            return '/superusuario/solicitudes';
        }
    };

    return (
        <>
            <Grid container direction="column">
                <Grid item container xs={12}>
                    {rolUsuario()}
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
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.solicitante}
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
                                                    {row.solicitante}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.email}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.dni}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.fechaHora}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.telefono}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

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
                                borderRadius: '10px 10px 0px 0px',
                                borderBottom: '1px solid #dadce0'
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
                                <Titulos titulolabel component="h2">
                                    Datos Universidad Nacional de Hurlingham
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
                                        name="materiaSolicitada"
                                        label="Materia solicitada UNAHUR"
                                        value={equiv.nombre}
                                        variant="outlined"
                                        focused={true}
                                        size="small"
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
                                        label="Carreras UNAHUR"
                                        value={equiv.carrera}
                                        variant="outlined"
                                        size="small"
                                        focused={true}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                </Grid>
                            </Grid>
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
                                                    {/* nota: obtainedEquivalenciaData.Materias_aprobadas[0].nota,
                                carga_horaria: obtainedEquivalenciaData.Materias_aprobadas[0].carga_horaria,
                                año_aprobacion: obtainedEquivalenciaData.Materias_aprobadas[0].año_aprobacion,
                                nombre_materia: obtainedEquivalenciaData.Materias_aprobadas[0].nombre_materia,
                                // UniversidadOrigenId: item.universidadOrigen
                                certificado: obtainedEquivalenciaData.Materias_aprobadas[0].certificado */}

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
                                                        {/* <FormControl component="fieldset">
                                        <FormLabel component="legend" sx={{ fontSize: '14px' }}>
                                            ¿Tiene certificado?
                                        </FormLabel>
                                        <RadioGroup
                                            required
                                            row
                                            aria-label="bool"
                                            name="certificado"
                                            onChange={(event) => handleChangeArray(event, key2)}
                                            value={formValueArray.certificado}
                                        >
                                            <FormControlLabel
                                                value={true}
                                                control={<Radio size="small" />}
                                                label="Si"
                                            />
                                            <FormControlLabel
                                                value={false}
                                                control={<Radio size="small" />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl> */}
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
                                                    {/* <Grid
                                                        item
                                                        container
                                                        xs={12}
                                                    >
                                                        <Titulos
                                                            titulolabel
                                                            variant="subtitle2"
                                                            fontSize={{
                                                                xs: '14px',
                                                                sm: '16px'
                                                            }}
                                                        >
                                                            Adjuntar programa de
                                                            la materia .pdf
                                                        </Titulos>
                                                    </Grid> */}

                                                    {/* <Grid
                                                        item
                                                        container
                                                        xs={12}
                                                        sx={{
                                                            marginTop: '16px'
                                                        }}
                                                    > */}
                                                    {/* <label
                                                            htmlFor="contained-button-file"
                                                            style={{
                                                                width: '100%'
                                                            }}
                                                        > */}
                                                    {/* <BotonMUI
                                                                sx={{
                                                                    marginRight:
                                                                        '12px'
                                                                }}
                                                                buttonupload
                                                                variant="outlined"
                                                                component="span"
                                                            >
                                                                Descargar
                                                            </BotonMUI> */}
                                                    {/* <IconButton
                                            sx={{
                                                marginRight: '12px'
                                            }}
                                            buttonupload
                                            variant="outlined"
                                            component="span"
                                        >
                                            <AttachFileOutlinedIcon />
                                        </IconButton> */}
                                                    {/* <FileUploader
                                            id="contained-button-file"
                                            multiple
                                            size="small"
                                            variant="standard"
                                            type="file"
                                            accept="application/pdf, application/vnd.ms-Excel"
                                        /> */}
                                                    {/* </label> */}
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
                            {/* <Grid
                            item
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            sm={12}
                            sx={{
                                padding: '0px 0px 20px 0px'
                            }}
                        >
                            <p
                                style={{
                                    color: 'rgba(0, 0, 0, 0.87)',
                                    fontWeight: 500
                                }}
                            >
                                
                                Devolución
                            </p>
                        </Grid> */}

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
                                    {/* <TextareaAutosize
                                    style={{
                                        width: '100%',
                                        height: '206px',
                                        resize: 'none',
                                        fontFamily: 'roboto',
                                        fontSize: '16px',
                                        padding: '18px 14px',
                                        background: '#f8f9fa',
                                        borderStyle: 'none',
                                        borderRadius: '5px 0px 0px 0px',
                                        borderBottom: '1px solid #80868b',
                                        outline: 'none'
                                    }}
                                    placeholder="Observación..."
                                /> */}

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

                                    {/*<TextField
                                        id="filled-basic"
                                        label="Observación..."
                                        variant="filled"
                                        multiline
                                        value={formValue.observaciones}
                                        name="observaciones"
                                        onChange={handleChange}
                                        rows={8}
                                        sx={{
                                            width: '100%'
                                        }}
                                    />*/}
                                </Grid>

                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    sm={12}
                                    sx={{
                                        marginTop: '20px'
                                    }}
                                >
                                    <ToggleButtonGroup
                                        value={formValue.estado}
                                        id="estado"
                                        exclusive
                                        onChange={handleChangeToggle}
                                    >
                                        <ToggleButton
                                            color="primary"
                                            id="estado"
                                            value="Aceptado"
                                        >
                                            Aceptar
                                        </ToggleButton>
                                        <ToggleButton
                                            value="Falta completar"
                                            id="estado"
                                        >
                                            Falta completar
                                        </ToggleButton>
                                        <ToggleButton
                                            color="error"
                                            value="Rechazado"
                                            id="estado"
                                        >
                                            Rechazar
                                        </ToggleButton>
                                    </ToggleButtonGroup>

                                    {/* <BotonMUI
                                    buttoncontainedsmall
                                    sx={{
                                        background: '#009673',
                                        '&:hover': {
                                            background: '#007A5E'
                                        }
                                        // background: '#348FDC',
                                        // '&:hover': {
                                        //     background: '#2380D1'
                                        // }
                                        // marginBottom: '10px'
                                    }}
                                >
                                    Responder
                                </BotonMUI>

                                {/* <BotonMUI
                                    buttonContainedSmall
                                    sx={{
                                        background: '#ffa726',
                                        '&:hover': {
                                            background: '#f57c00'
                                        },
                                        marginLeft: '14px',
                                        marginRight: '14px'
                                    }}
                                >
                                    Solicitar +
                                </BotonMUI> */}

                                    {/* <BotonMUI
                                    buttonContainedSmall
                                    sx={{
                                        background: '#E74924',
                                        '&:hover': {
                                            background: '#CA3716'
                                        }
                                    }}
                                >
                                    Rechazar
                                </BotonMUI> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </GridTop>
                    <OuterFormButtons
                        handleSubmit={handleSubmit}
                        path={urlUsuario()}
                        titulo={'Descartar revisión'}
                        mensaje={
                            '¿Está seguro/a de que desea descartar la revisión de la solicitud?'
                        }
                    />
                </Grid>
            </Grid>
        </>
    );
};

export { PageRevision };
