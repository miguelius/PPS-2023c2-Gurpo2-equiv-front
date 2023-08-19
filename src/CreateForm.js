import { Grid, TextField } from '@mui/material';
import {
    StandardInput,
    AutocompleteInput
} from './components/atoms/Input/InputMUI';
import { Titulos } from './components/atoms/Title/Titulos';
import React, { useState } from 'react';
import { GridTop } from './GridTop';
import { FormUniOrigen } from './FormUniOrigen';
import { BotonMUI } from './components/atoms/Button/BotonMUI';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { OuterFormButtons } from './OuterFormButtons';
import { config } from '../src/config/config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { getCarreras, getNombresCarreras } from './services/carrera_service';
const CreateForm = () => {
    const [materias, setMaterias] =
        // <FormUniOrigen key={nanoid()} />
        // <FormUniOrigen key={nanoid()} />
        useState([
            {
                key: nanoid(),
                notaAprobacion: null,
                cargaHorariaTotal: null,
                anioAprobacion: '',
                materiaAprobada: '',
                universidadOrigen: 1, // id de universidad
                certificado: false
            }
        ]);
    //Push de esto?
    // const materiasAprobadasArray = {

    // 		key: idMateriaUno,
    // 		materiaAprobada: '',
    // 		universidadOrigen: '',
    // 		anioAprobacion: '',
    // 		cargaHorariaTotal: '',
    // 		notaAprobacion: ''
    // })

    const [formValue, setformValue] = useState({
        materiaSolicitada: '',
        carreraUnahur: ''
    });

    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        const fetchCarreras = async () => {
            const carreras = await getCarreras();
            setCarreras(carreras);
        };
        fetchCarreras();
    }, []);

    const nombresCarreras =
        carreras.data?.map((carrera) => carrera.nombre_carrera) ?? [];

    const notifyEnviarSinDatos = () => {
        toast.error('Debe completar todos los campos del formulario', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const notifyBorrarMateria = () => {
        toast.warn('Tiene que enviar al menos una materia', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const notifyExito = () => {
        toast.success('Equivalencia creada con éxito', {
            containerId: 'home',
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const addMateria = () => {
        // setMaterias((materias) => [
        // 	...materias,
        // 	<FormUniOrigen key={nanoid()} />
        // ]);

        setMaterias((materias) => [
            ...materias,
            {
                key: nanoid(),
                notaAprobacion: null,
                cargaHorariaTotal: null,
                anioAprobacion: '',
                materiaAprobada: '',
                universidadOrigen: 1, // id de universidad
                certificado: false
            }
        ]);

        // formValue.materiasAprobadas.push(formValueArray);

        console.log('Agregar Materias: ', materias);
    };

    const handleChange = (event) => {
        if (event.target.name === 'carreraUnahur') {
            try {
                const id_carrera = carreras.data.find(
                    (carrera) => carrera.nombre_carrera === event.target.value
                ).id;
                setformValue((formValue) => ({
                    ...formValue,
                    [event.target.name]: id_carrera
                }));
            } catch (error) {
                console.log(error);
            }
        } else {
            setformValue((formValue) => ({
                ...formValue,
                [event.target.name]: event.target.value
            }));
        }

        console.log(event.target.key);
        console.log(event.target.value);
        console.log(event.target.name);
        console.log(formValue);
    };

    const handleChangeArray = (event, key) => {
        // const materia = materias.find(e => e.key === key)
        // setFormValueArray((formValueArray) => ({
        //     ...formValueArray,
        //     [event.target.name]: event.target.value
        // }));
        // setformValue((formValue));
        // console.log(event.target.key);
        // console.log(event.target.value);
        // console.log(event.target.name);
        // console.log(formValueArray);
        const indiceMateria = materias.findIndex((e) => e.key === key);
        console.log(materias);
        console.log(key);
        console.log(indiceMateria);
        console.log(materias[indiceMateria]);
        // console.log({
        //     ...materias[indiceMateria],
        //     [event.target.name]: event.target.value
        // });
        setMaterias((materias) => {
            return [
                ...materias.slice(0, indiceMateria),
                {
                    ...materias[indiceMateria],
                    [event.target.name]: event.target.value
                },
                ...materias.slice(indiceMateria + 1)
            ];
        });
    };
    console.log('Materias aprobadas: ', materias);

    //TURNOS

    // const handleChangeHour = (id, event) => {
    //     const newInputFields = horarios.map((horario) => {
    //       if (id === horario.id) {
    //         horario[event.name] = event.value;
    //       }
    //       return horario;
    //     });

    //     setHorarios(newInputFields);
    //   };

    //NUESTRO

    // const handleChangeArray = (key, event) => {
    // 	// if(key === formValue.materiasAprobadas[formValues.key]) {
    // 		setformValue((formValues) => ({
    // 			...formValues,
    // 			if(key === formValues.materiasAprobadas[key]){
    // 				[event.target.name] : event.target.value
    // 			}

    // 		}))
    // }
    // }

    const usuarioId = parseInt(JSON.parse(localStorage.getItem('id')));

    const handleSubmit = async () => {
        let equivalencia;

        if (usuarioId) {
            console.log('Enviando equivalencia...');
            console.log('Materias aprobadas: ', materias);
            console.log('FormValue: ', formValue);
            equivalencia = {
                nombre: formValue.materiaSolicitada,
                CarreraId: formValue.carreraUnahur,
                estado: 'Pendiente',
                observaciones: '',
                instituto: 'Instituto de Tecnología e Ingeniería',
                array: materias.map((item) => {
                    return {
                        nota: item.notaAprobacion,
                        carga_horaria: item.cargaHorariaTotal,
                        año_aprobacion: item.anioAprobacion,
                        nombre_materia: item.materiaAprobada,
                        UniversidadOrigenId: 1,
                        certificado: item.certificado
                    };
                }),
                UsuarioId: usuarioId
            };
        }

        console.log('Equivalencia:', equivalencia);

        // const response = await fetch(
        //     'http://localhost:3001/api/equivalencias/createx3',
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(equivalencia)
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         notifyExito();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        const response = await axios
            .post(`${config.apiUrl}/equivalencias/createx3`, equivalencia, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                try {
                    console.log('Res:', res);
                    res.status === 200 ? notifyExito() : notifyEnviarSinDatos();
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
                notifyEnviarSinDatos();
            });

        // try {
        //     const response = await axios
        //         .post(
        //             'http://localhost:3001/api/equivalencias/createx3',
        //             equivalencia,
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 }
        //             }
        //         )
        //         .then((res) => {
        //             console.log(res);
        //             response.status === 200
        //                 ? notifyExito()
        //                 : console.log('Error');
        //         });
        // } catch (error) {
        //     console.log('Catch error: ', error);
        //     notifyEnviarSinDatos();
        // }

        // await axios.post(
        //     'http://localhost:3001/api/equivalencias/createx3',
        //     { equivalencia },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // )
        // .then((response) => {
        //     console.log(response);
        //     response.status === 201 ? notifyExito() : console.log('Error');
        // })
        // .catch((error) => {
        //     console.log(error);
        //     notifyEnviarSinDatos();
        // });

        // res.data.headers['application/json']; // 'application/json;charset=utf-8',

        // store the states in the form data
        // const loginFormData = new FormData();
        // loginFormData.append('materiaSolicitada', formValue.materiaSolicitada);
        // loginFormData.append('carreraUnahur', formValue.carreraUnahur);
        // loginFormData.append('materiaAprobada', formValue.materiaAprobada);
        // loginFormData.append('universidadOrigen', formValue.universidadOrigen);
        // loginFormData.append('anioAprobacion', formValue.anioAprobacion);
        // loginFormData.append('cargaHorariaTotal', formValue.cargaHorariaTotal);
        // loginFormData.append('notaAprobacion', formValue.notaAprobacion);

        // const loginFormData = new FormData();
        // loginFormData.append('materiaSolicitada', formValue.materiaSolicitada);
        // loginFormData.append('carreraUnahur', formValue.carreraUnahur);
        // loginFormData.append('materiasAprobadas', materias);

        // try {
        //     // make axios post request
        //     const response = await axios({
        //         method: 'post',
        //         url: `${config.apiUrl}/materias_solicitadas`,
        //         data: loginFormData,
        //         headers: { 'content-type': 'text/json' }
        //     });

        //     console.log(loginFormData.get('materiaSolicitada'));
        //     console.log(loginFormData.get('carreraUnahur'));
        //     console.log(loginFormData.get('materiasAprobadas'));
        //     console.log(formValue);
        //     console.log(materias);
        //     for (var pair of loginFormData.entries()) {
        //         console.log(pair[0] + ', ' + pair[1]);
        //     }
        // } catch (Exception) {
        //     console.log(Exception);
        // }
    };

    const [materiaEliminar, setMateriaEliminar] = React.useState(null);

    const handleClickOpen = (materia) => {
        setMateriaEliminar(materia);
    };

    const handleClose = () => {
        setMateriaEliminar(null);
    };

    return (
        // <Grid
        //     item
        //     container
        //     blanco
        //     xs={11.5}
        //     md={7}
        //     marginTop={{
        //         xs: '30px'
        //     }}
        //     sx={{
        //         height: 'auto'
        //     }}
        // >
        // <form
        //     style={{
        //         backgroundColor: 'red',
        //         display: 'block',
        //         width: '100%',
        //         height: '100%'
        //     }}
        // >
        <>
            <GridTop
                item
                container
                blanco
                xs={11.5}
                md={7}
                marginTop={{
                    xs: '30px'
                }}
                sx={{
                    height: 'auto'
                }}
            >
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
                                required
                                name="materiaSolicitada"
                                size="small"
                                label="Materia solicitada UNAHUR"
                                variant="outlined"
                                value={formValue.materiaSolicitada || ''}
                                onChange={handleChange}
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
                            <AutocompleteInput
                                size="small"
                                variant="outlined"
                                onSelect={handleChange}
                                disablePortal
                                options={nombresCarreras}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        {...params}
                                        label="Carreras UNAHUR"
                                        name="carreraUnahur"
                                        value={formValue.carreraUnahur || ''}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {materias.map((materia) => {
                    console.log(materia.key);
                    return (
                        <>
                            <FormUniOrigen
                                key2={materia.key}
                                key={materia.key}
                                // handledelete={
                                //     materias.length > 1
                                //         ? () => {
                                //               const newMaterias = materias.filter(
                                //                   (x) => x.key !== materia.key
                                //               );
                                //               setMaterias([...newMaterias]);
                                //               console.log(materias);
                                //           }
                                //         : () => {
                                //               console.log('Eliminar este console');
                                //           }
                                // }

                                handledelete={() => {
                                    console.log(formValue);

                                    if (materias.length > 1) {
                                        // const newMaterias = materias.filter(
                                        //     (x) => x.key !== materia.key
                                        // );
                                        // setMaterias([...newMaterias]);
                                        // console.log(materias);
                                        handleClickOpen(materia);
                                    } else {
                                        notifyBorrarMateria();
                                    }
                                }}
                                handleChangeArray={handleChangeArray}
                                formValueArray={materia}
                            />

                            <Dialog
                                open={materiaEliminar !== null}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {'Borrar materia del formulario'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        ¿Seguro/a que desea borrar esta materia?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setMaterias(() =>
                                                //Se eliminó el parámetro materias en setMaterias
                                                materias.filter(
                                                    (x) =>
                                                        x.key !==
                                                        materiaEliminar.key
                                                )
                                            );
                                            handleClose();
                                        }}
                                    >
                                        Aceptar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    );
                })}

                <Grid
                    item
                    container
                    xs={12}
                    sx={{
                        borderTop: '1px solid #DADCE0',
                        marginTop: '20px ',
                        padding: '0px 40px'
                    }}
                >
                    <BotonMUI
                        buttoncontainedaddmateria
                        variant="outlined"
                        sx={{ margin: '10px 0px' }}
                        onClick={addMateria}
                    >
                        Agregar materia
                    </BotonMUI>
                </Grid>
            </GridTop>
            <OuterFormButtons
                handleSubmit={handleSubmit}
                path={'/usuario/equivalencias'}
                titulo={'Descartar formulario'}
                mensaje={'¿Está seguro/a de que desea descartar el formulario?'}
            />
        </>
        // </form>
        // </Grid>
    );
};

export { CreateForm };
