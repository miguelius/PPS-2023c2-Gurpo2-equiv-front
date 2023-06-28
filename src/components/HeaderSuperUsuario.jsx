import { AppBar, Toolbar, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { BotonMUI } from './atoms/Button/BotonMUI';
import React from 'react';
import AvatarIcon from './AvatarIcon';

const HeaderSuperUsuario = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#122C34' }}>
            <Toolbar color="#122C34">
                <Grid xs={0.25} lg={1.5} />

                <Grid
                    container
                    lg={9}
                    justifyContent="space-between"
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    <Grid
                        item
                        justifyContent={'flex-start'}
                        alignContent={'center'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Grid md={7}>
                            <BotonMUI variant="text" sx={{ width: '130px' }}>
                                Perfil
                            </BotonMUI>
                        </Grid>
                        <Grid md={7}>
                            <Link
                                to={'/superusuario/solicitudes'}
                                style={{ textDecoration: 'none' }}
                            >
                                <BotonMUI
                                    variant="text"
                                    sx={{ width: '130px' }}
                                >
                                    Equivalencias
                                </BotonMUI>
                            </Link>
                        </Grid>
                        <Grid md={7}>
                            <Link
                                to={'/superusuario/usuarios'}
                                style={{ textDecoration: 'none' }}
                            >
                                <BotonMUI
                                    variant="text"
                                    sx={{ width: '130px' }}
                                >
                                    Usuarios
                                </BotonMUI>
                            </Link>
                        </Grid>
                        <Grid md={7}>
                            <Link
                                to={'/superusuario/carreras'}
                                style={{ textDecoration: 'none' }}
                            >
                                <BotonMUI
                                    variant="text"
                                    sx={{ width: '130px' }}
                                >
                                    Carreras
                                </BotonMUI>
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        justifyContent={'flex-end'}
                        alignContent={'center'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <AvatarIcon
                            info={[
                                `${JSON.parse(
                                    localStorage.getItem('nombre')
                                ).trim()} ${JSON.parse(
                                    localStorage.getItem('apellido')
                                ).trim()}`
                            ]}
                        />

                        <Grid item container sx={{ marginLeft: '40px' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <BotonMUI
                                    buttoncontained
                                    buttonlogout
                                    variant="contained"
                                    sx={{ width: '150px' }}
                                    onClick={() => {
                                        localStorage.clear();
                                    }}
                                >
                                    Cerrar sesión
                                </BotonMUI>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export { HeaderSuperUsuario };
