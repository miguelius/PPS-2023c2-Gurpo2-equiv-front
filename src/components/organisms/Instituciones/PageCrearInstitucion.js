import React from 'react';
import { useEffect, useState } from 'react';
import { postInstituciones } from '../../../services/institucionService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    Container,
    Grid,
    styled,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import { Header } from '../../../Header';
import Image from 'mui-image';
import {
    ContainerFlexDirection,
    ContainerCenterButton,
    ContainerTitle
} from './InstitucionesStyled';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const PageCrearInstitucion = () => {
    const [nombre, setNombre] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [sigla, setSigla] = useState('');

    const history = useHistory();
    const notifyExito = () => {
        toast.success('Institución creada con éxito', {
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

    const notifyError = () => {
        toast.error('Se produjo un error al intentar crear la institución', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const handleBack = () => {
        history.push('/direccion/instituciones');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const institucion = await postInstituciones(
                nombre,
                localidad,
                sigla
            );
            console.log(institucion);
            notifyExito();
            setTimeout(() => {
                history.push('/direccion/instituciones');
            }, 5500);
        } catch (error) {
            console.log(error);
            notifyError();
        }
    };

    return (
        <>
            <Grid item container xs={12}>
                <Header name="Instituciones" paginaPrincipal="/" />
            </Grid>

            <ContainerFlexDirection>
                <Grid container spacing={2} xs={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ padding: '2rem', width: '100%' }}
                    >
                        <Link to="/direccion/instituciones">
                            <IconButton sx={{ padding: 0 }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <ContainerTitle>
                            <Typography variant="h3" component="h1">
                                Crear Institución
                            </Typography>
                        </ContainerTitle>
                        <Grid container spacing={2}>
                            <Grid item spacing={2} xs={12}>
                                <TextField
                                    required
                                    id="nombre"
                                    name="nombre"
                                    label="Nombre"
                                    fullWidth
                                    autoComplete="given-name"
                                    value={nombre}
                                    sx={{ backgroundColor: '#ffffff' }}
                                    onChange={(event) =>
                                        setNombre(event.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="sigla"
                                    name="sigla"
                                    label="Sigla"
                                    fullWidth
                                    autoComplete="family-name"
                                    value={sigla}
                                    sx={{ backgroundColor: '#ffffff' }}
                                    onChange={(event) =>
                                        setSigla(event.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="localidad"
                                    name="localidad"
                                    label="Localidad"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    value={localidad}
                                    sx={{ backgroundColor: '#ffffff' }}
                                    onChange={(event) =>
                                        setLocalidad(event.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <ContainerCenterButton>
                            <Button
                                size="large"
                                fullWidth
                                onClick={handleSubmit}
                                variant="contained"
                            >
                                Crear Institución
                            </Button>
                        </ContainerCenterButton>
                    </Box>
                </Grid>
                <Grid container spacing={2} xs={6}>
                    <Image src="https://res.cloudinary.com/dfwvsjwjr/image/upload/v1684188114/institucion_wo7bxt.png" />
                </Grid>
            </ContainerFlexDirection>
        </>
    );
};
export default PageCrearInstitucion;
