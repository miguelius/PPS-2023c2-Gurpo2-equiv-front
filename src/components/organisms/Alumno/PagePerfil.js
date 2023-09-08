import { Grid } from '@mui/material';
import { GridTop } from '../../atoms/GridTop';
import { Header } from '../../molecules/Header';
import { Titulos } from '../../atoms/Title/Titulos';
import { BotonMUI } from '../../atoms/Button/BotonMUI';
import StickyHeadTable from '../TableAlumno';
import React from 'react';

const PagePerfil = () => {
    return (
        <Grid container direction="column">
            <Grid item container xs={12}>
                <Header name="Mis equivalencias" />
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
                        <Titulos component="h2" tituloGrande="+true">
                            Perfil
                        </Titulos>
                    </Grid>
                </GridTop>

                <GridTop
                    item
                    container
                    blanco="+true"
                    xs={11.5}
                    md={7}
                    marginTop={{
                        xs: '30px'
                    }}
                    sx={{
                        height: 'auto'
                    }}
                >
                    <StickyHeadTable />
                </GridTop>
            </Grid>
        </Grid>
    );
};

export { PagePerfil };
