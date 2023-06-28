import { AppBar, Toolbar, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { AccessAlarm } from '@mui/icons-material';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Menu } from './Menu';
import React from 'react';
import md5 from 'md5';

const dni = JSON.parse(localStorage.getItem('dni'));

let stringConcat = '';

if (dni) {
    stringConcat = 'https://gravatar.com/avatar/'.concat(
        md5(dni),
        '?s=30&d=retro&r=g'
    );
}

const Header = ({ name, paginaPrincipal, botonSeleccionado }) => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#122C34' }}>
            <Toolbar color="#122C34">
                <Grid item xs={0.25} lg={1.5} />

                <Grid
                    container
                    item
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
                        <Grid item md={5} sx={{ marginRight: '40px' }}>
                            <Link
                                to={'/usuario/equivalencias/'}
                                style={{ textDecoration: 'none' }}
                            >
                                <BotonMUI
                                    variant="text"
                                    sx={{
                                        width: '150px',
                                        backgroundColor: `${botonSeleccionado}`
                                    }}
                                >
                                    Mis equivalencias
                                </BotonMUI>
                            </Link>
                        </Grid>

                        <Grid item md={5}>
                            <BotonMUI variant="text" sx={{ width: '130px' }}>
                                Perfil
                            </BotonMUI>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        justifyContent={'flex-end'}
                        alignContent={'center'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <img
                            src={stringConcat}
                            alt=""
                            style={{ borderRadius: '100%' }}
                            width={'32px'}
                        />

                        <Grid item container sx={{ marginLeft: '40px' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <BotonMUI
                                    buttoncontained="+true"
                                    buttonlogout="+true"
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

                {/* Mobile */}
                <Grid
                    container
                    item
                    justifyContent="space-between"
                    xs={11.5}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                    <Grid item>
                        <Menu name={name} paginaPrincipal={paginaPrincipal} />
                    </Grid>
                </Grid>

                <Grid item xs={0.25} lg={1.5} />
            </Toolbar>
        </AppBar>
    );
};

export { Header, stringConcat };
