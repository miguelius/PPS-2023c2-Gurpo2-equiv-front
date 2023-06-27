import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { GridTop } from '../atoms/GridTop';
import { FormUniOrigen } from './FormUniOrigen';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { OuterFormButtons } from './OuterFormButtons';
import { config } from '../../config/config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormUnahur from './FormUnahur';

const CreateForm = () => {
    const carreras = [
        {
            key: nanoid(),
            label: 'Tecnicatura en Electromovilidad',
            instituto: 'Instituto de Tecnología e Ingeniería'
        },
        {
            key: nanoid(),
            label: 'Tecnicatura en Inteligencia Artificial',
            instituto: 'Instituto de Tecnología e Ingeniería'
        },
        {
            key: nanoid(),
            label: 'Tecnicatura en Programación',
            instituto: 'Instituto de Tecnología e Ingeniería'
        },
        {
            key: nanoid(),
            label: 'Tecnicatura en Programación de Videojuegos',
            instituto: 'Instituto de Tecnología e Ingeniería'
        },
        {
            key: nanoid(),
            label: 'Tecnicatura en Ciencias del Ambiente',
            instituto: 'Instituto de Biotecnología'
        }
    ];

    const usuarioId = parseInt(JSON.parse(localStorage.getItem('id')));

    const [handleEliminar, handlePerepe] = useState(false);

    const [materias, setMaterias] = useState([
        {
            key: nanoid(),
            notaAprobacion: null,
            cargaHorariaTotal: null,
            anioAprobacion: '',
            materiaAprobada: '',
            universidadOrigen: 1,
            certificado: false
        }
    ]);

    const [materiaEliminar, setMateriaEliminar] = useState(null);

    const [materiasUnahur, setMateriasUnahur] = useState([
        {
            key: nanoid(),
            materiaUnahur: '',
            estado: 'pendiente'
        }
    ]);

    //Cambiarlo a un string que no sea un obj.
    const [formValue, setformValue] = useState({
        carreraUnahur: ''
    });

    const elegirMateriaABorrar = (bool) => {
        handlePerepe((handleEliminar) => (handleEliminar = bool));
    };

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
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        // Esperar 5 segundos
        setTimeout(() => {
            window.location = '/usuario/equivalencias';
        }, 2000);
    };

    //Materias boton agregar
    const addMateria = () => {
        setMaterias((materias) => [
            ...materias,
            {
                key: nanoid(),
                notaAprobacion: null,
                cargaHorariaTotal: null,
                anioAprobacion: '',
                materiaAprobada: '',
                universidadOrigen: 1,
                certificado: false
            }
        ]);

        //console.log('Agregar Materias: ', materias);
    };

    //MateriasUnahur funtions
    const addMateriaUnahur = () => {
        setMateriasUnahur((materiasUnahur) => [
            ...materiasUnahur,
            {
                key: nanoid(),
                materiaUnahur: '',
                estado: 'pendiente'
            }
        ]);
    };

    const handleChangeMateriaUnaHur = (event, key) => {
        const copiaMaterias = [].concat(materiasUnahur);
        const { value } = event.target;

        copiaMaterias
            .filter((mat) => mat.key === key)
            .map((mat) => (mat.materiaUnahur = value));
        setMateriasUnahur(copiaMaterias);
    };

    //Carrera
    const handleChangeCarrera = (event) => {
        const { name, value } = event.target;
        setformValue((carrera) => ({
            ...carrera,
            [name]: value
        }));
    };

    //MateriasEquivalencias functions
    const handleChangeArray = (event, key) => {
        const indiceMateria = materias.findIndex((e) => e.key === key);
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
    //console.log('Materias aprobadas: ', materias);
    const handleClickOpen = (materia) => {
        setMateriaEliminar(materia);
    };

    const handleClose = () => {
        setMateriaEliminar(null);
    };

    //Summit function
    const handleSubmit = async () => {
        let equivalencia;

        if (usuarioId) {
            equivalencia = {
                //Ver que onda con el nombre si no se envia explota.
                nombre: 'Equivalencia',
                materiaSolicitada: materiasUnahur.map((item) => {
                    return {
                        nombre: item.materiaUnahur,
                        estado: 'pendiente'
                    };
                }),
                observaciones: ' ',
                instituto: 'Instituto de Tecnología e Ingeniería',
                estado: 'pendiente',
                carrera: formValue.carreraUnahur,
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

        const response = await axios
            .post(`${config.apiUrl}/equivalencias/createx3`, equivalencia, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                try {
                    res.status === 200 ? notifyExito() : notifyEnviarSinDatos();
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
                notifyEnviarSinDatos();
            });
    };

    return (
        <>
            <GridTop
                item
                container
                blanco="+true"
                xs={11.5}
                md={7}
                marginTop={{ xs: '30px' }}
                sx={{ height: 'auto' }}
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
                    <FormUnahur
                        formValue={formValue}
                        carreras={carreras}
                        materias={materiasUnahur}
                        handleChangeCarrera={handleChangeCarrera}
                        handleChangeMateriaUnaHur={handleChangeMateriaUnaHur}
                        handledelete={handleClickOpen}
                        handledelete2={notifyBorrarMateria}
                        handleEliminar={elegirMateriaABorrar}
                    />
                </Grid>

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
                        buttoncontainedaddmateria="+true"
                        variant="outlined"
                        sx={{ margin: '10px 0px' }}
                        onClick={addMateriaUnahur}
                    >
                        Agregar materia
                    </BotonMUI>
                </Grid>

                {materias.map((materia) => {
                    return (
                        <>
                            <FormUniOrigen
                                key2={materia.key}
                                key={materia.key}
                                handledelete={() => {
                                    if (materias.length > 1) {
                                        elegirMateriaABorrar(true);
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
                                            if (handleEliminar) {
                                                setMaterias(() =>
                                                    //Se eliminó el parámetro materias en setMaterias
                                                    materias.filter(
                                                        (x) =>
                                                            x.key !==
                                                            materiaEliminar.key
                                                    )
                                                );
                                            } else {
                                                setMateriasUnahur(() =>
                                                    materiasUnahur.filter(
                                                        (x) =>
                                                            x.key !==
                                                            materiaEliminar.key
                                                    )
                                                );
                                            }
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
                        buttoncontainedaddmateria="+true"
                        variant="outlined"
                        sx={{ margin: '10px 0px' }}
                        onClick={addMateria}
                    >
                        Agregar materia
                    </BotonMUI>
                </Grid>
            </GridTop>
            <Grid
                container
                item
                xs={11.5}
                md={7}
                justifyContent="space-between"
                marginTop="1rem"
            >
                <OuterFormButtons
                    handleSubmit={handleSubmit}
                    path={'/usuario/equivalencias'}
                    titulo={'Descartar formulario'}
                    mensaje={
                        '¿Está seguro/a de que desea descartar el formulario?'
                    }
                />
            </Grid>
        </>
    );
};

export { CreateForm };
