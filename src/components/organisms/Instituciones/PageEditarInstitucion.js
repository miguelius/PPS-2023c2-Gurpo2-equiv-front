import React from 'react';
import { useEffect, useState } from 'react';
import {
    putInstituciones,
    getInstitucion,
    disabledInstituciones
} from '../../../services/institucionService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Grid, styled, Typography, Button } from '@mui/material';
import { Header } from '../../../Header';
import Image from 'mui-image';
import {
    ContainerFlexDirection,
    ContainerCenterButton,
    ContainerTitle
} from './InstitucionesStyled';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const PageEditarInstitucion = () => {
    const [nombre, setNombre] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [sigla, setSigla] = useState('');
    const { id } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const institucion = await putInstituciones(
                nombre,
                localidad,
                sigla,
                id
            );
            console.log(institucion);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDisabled = async (event) => {
        event.preventDefault();
        try {
            const institucion = await disabledInstituciones(id);
            console.log(institucion);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getInstitucionPorId = async () => {
            try {
                const institucion = await getInstitucion(id);
                console.log('institucion', institucion);
                setNombre(institucion.nombre_universidad);
                setLocalidad(institucion.localidad);
                setSigla(institucion.sigla);
            } catch (error) {
                console.log(error);
            }
        };
        getInstitucionPorId();
    }, []);

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
                        <ContainerTitle>
                            <Typography
                                variant="h4"
                                align="left"
                                component="h2"
                            >
                                Editar Institución
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
                                Editar Institución
                            </Button>
                        </ContainerCenterButton>
                        <Grid item xs={12}>
                            <Divider />
                            <ContainerTitle>
                                <Typography
                                    variant="h4"
                                    align="left"
                                    component="h2"
                                >
                                    Deshabilitar Institución
                                </Typography>
                            </ContainerTitle>
                            <ContainerCenterButton>
                                <Button
                                    size="large"
                                    fullWidth
                                    onClick={handleDisabled}
                                    color="error"
                                    variant="contained"
                                >
                                    Deshabilitar Institución
                                </Button>
                            </ContainerCenterButton>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container spacing={2} xs={6}>
                    <Image src="https://res.cloudinary.com/dfwvsjwjr/image/upload/v1684188114/institucion_wo7bxt.png" />
                </Grid>
            </ContainerFlexDirection>
        </>
    );
};
export default PageEditarInstitucion;
