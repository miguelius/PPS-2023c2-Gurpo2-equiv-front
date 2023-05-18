import { React } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Header } from '../../../Header';
import { ContainerTitle } from './DireccionStyled';
import DashboardCard from '../../atoms/DashboardCard/DashboardInstitucionCard';
const DireccionDashboard = () => {
    return (
        <>
            <Grid item container xs={12}>
                <Header name="Instituciones" paginaPrincipal="/" />
            </Grid>
            <Container sx={{ padding: '2rem' }}>
                <Grid container spacing={2} xs={12}>
                    <ContainerTitle>
                        <Typography variant="h3" component="h1">
                            Menú de Dirección
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
                                    tituloCard="Solicitudes"
                                    cuerpoCard="Ver las solicitudes de equivalencia."
                                    imgSrc="https://res.cloudinary.com/dfwvsjwjr/image/upload/c_scale,w_68/v1684362644/solicitud_rryiab.png"
                                    link={'/direccion/solicitudes'}
                                />
                            </Grid>

                            <Grid sx={{ padding: '0.5rem' }}>
                                <DashboardCard
                                    tituloCard="Instituciones"
                                    cuerpoCard="Ir a control de instituciones en el sistema."
                                    imgSrc="https://res.cloudinary.com/dfwvsjwjr/image/upload/c_scale,w_68/v1684362643/institucion_1_plx7hx.png"
                                    link={'/direccion/instituciones'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default DireccionDashboard;
