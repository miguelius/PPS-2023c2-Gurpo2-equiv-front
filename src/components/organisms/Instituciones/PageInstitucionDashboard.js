import { React } from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { Header } from '../../molecules/Header';
import { ContainerTitle } from './InstitucionesStyled';
import DashboardCard from '../../atoms/DashboardCard/DashboardInstitucionCard';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const InstitucionesDashboard = () => {
    return (
        <>
            <Grid item container xs={12}>
                <Header name="Instituciones" paginaPrincipal="/" />
            </Grid>
            <Container sx={{ padding: '2rem' }}>
                <Grid container spacing={2} xs={12}>
                    <Link to="/direccionDashboard">
                        <IconButton sx={{ padding: 0 }}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <ContainerTitle>
                        <Typography variant="h3" component="h1">
                            Menú de Instituciones
                        </Typography>
                    </ContainerTitle>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            spacing={2}
                            xs={12}
                            sx={{ flexDirection: 'row', display: 'flex' }}
                        >
                            <Grid sx={{ padding: '0.5rem' }}>
                                <DashboardCard
                                    tituloCard="Instituciones registradas"
                                    cuerpoCard="Ver todas las instituciones registradas en el sistema."
                                    imgSrc="https://res.cloudinary.com/dfwvsjwjr/image/upload/c_scale,w_68/v1684362643/institucion_1_plx7hx.png"
                                    link={'/instituciones/todas'}
                                />
                            </Grid>

                            <Grid sx={{ padding: '0.5rem' }}>
                                <DashboardCard
                                    tituloCard="Crear nueva institucion"
                                    cuerpoCard="Registrar una nueva institución en el sistema."
                                    imgSrc="https://res.cloudinary.com/dfwvsjwjr/image/upload/c_scale,w_68/v1684362643/institucion_1_plx7hx.png"
                                    link={'/instituciones/crear'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default InstitucionesDashboard;
