import { Grid } from '@mui/material';
import { Header } from './Header';
import { GridTop } from '../atoms/GridTop';
import { Titulos } from '../atoms/Title/Titulos';
import { CreateForm } from './CreateForm';
import React from 'react';

const PageCreateForm = () => {
    return (
        <Grid container direction="column">
            <Grid item container xs={12}>
                <Header
                    name="Mis equivalencias"
                    paginaPrincipal="/usuario/equivalencias/"
                />
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
                        <Titulos component="h2" titulogrande="+true">
                            Formulario de Equivalencia
                        </Titulos>
                    </Grid>
                </GridTop>

                <CreateForm />
            </Grid>
        </Grid>
    );
};

export { PageCreateForm };
