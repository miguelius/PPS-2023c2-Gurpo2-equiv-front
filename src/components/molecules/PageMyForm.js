import { Grid } from '@mui/material';
import { Header } from './Header';
import { GridTop } from '../atoms/GridTop';
import { Titulos } from '../atoms/Title/Titulos';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { FabButton } from '../atoms/Button/FabButton';
import StickyHeadTable from '../organisms/TableAlumno';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import TablaEquivalencias from './TablaEquivalencias';

const PageMyForm = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Grid container direction="column">
                <Grid item container xs={12}>
                    <Header
                        name="Mis equivalencias"
                        paginaPrincipal="/usuario/equivalencias/"
                        botonSeleccionado="rgba(255, 255, 255, 0.1);"
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
                        md={9}
                        lg={7}
                        sx={{
                            padding: '0px 20px'
                        }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Titulos component="h2" titulogrande>
                                Equivalencias
                            </Titulos>
                        </Grid>

                        <Grid
                            item
                            xs={0}
                            sx={{
                                display: { sm: 'flex', xs: 'none' }
                            }}
                        >
                            <Link
                                to="/usuario/formulario"
                                style={{ textDecoration: 'none' }}
                            >
                                <BotonMUI
                                    buttoncontainedsmall
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    Solicitar equivalencia
                                </BotonMUI>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={0}
                            sx={{
                                display: { sm: 'none', xs: 'flex' }
                            }}
                        >
                            <Link
                                to="/usuario/formulario"
                                style={{ textDecoration: 'none' }}
                            >
                                <FabButton>
                                    <AddIcon />
                                </FabButton>
                            </Link>
                        </Grid>
                    </GridTop>

                    <GridTop
                        item
                        container
                        blanco
                        xs={11.5}
                        md={9}
                        lg={7}
                        marginTop={{
                            xs: '0px',
                            sm: '30px'
                        }}
                        sx={{
                            height: 'auto'
                        }}
                    >
                        <TablaEquivalencias />
                        {/* <StickyHeadTable /> */}
                    </GridTop>
                </Grid>
            </Grid>
            <ToastContainer
                containerId={'home'}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export { PageMyForm };
