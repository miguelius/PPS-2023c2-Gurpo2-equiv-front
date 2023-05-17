import {
    AppBar,
    Toolbar,
    Button,
    ThemeProvider,
    Grid,
    Avatar,
    Tooltip,
    IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { AccessAlarm } from '@mui/icons-material';
import { BotonMUI } from './components/atoms/Button/BotonMUI';
import { Menu } from '../src/components/molecules/Menu';
import React from 'react';
import md5 from 'md5';

const dni = JSON.parse(localStorage.getItem('dni'));
const nombre = JSON.parse(localStorage.getItem('nombre'));
const apellido = JSON.parse(localStorage.getItem('apellido'));
const rol = JSON.parse(localStorage.getItem('rol'));

let stringConcat = '';
let userName = '';

if (dni) {
    stringConcat = 'https://gravatar.com/avatar/'.concat(
        md5(dni),
        '?s=30&d=retro&r=g'
    );
    userName = nombre.concat(' ', apellido);
}

const Header = ({ name, paginaPrincipal, botonSeleccionado }) => {
    return (
        <AppBar
            position="static"
            sx={{ bgcolor: rol === 'directivo' ? '#2D7AC0' : '#122C34' }}
        >
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
                        <Grid md={5} sx={{ marginRight: '40px' }}>
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

                        <Grid md={5}>
                            <BotonMUI variant="text" sx={{ width: '130px' }}>
                                Perfil
                            </BotonMUI>
                        </Grid>
                    </Grid>

                    {/* <Grid
                        item
                        justifyContent={'center'}
                        alignContent={'center'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <img
                            src="https://unahur.edu.ar/wp-content/uploads/2021/03/UNAHUR-1.png"
                            alt=""
                            width={'40px'}
                            height={'45px'}
                        />
                    </Grid> */}

                    <Grid
                        item
                        justifyContent={'flex-start'}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0px 16px',
                            marginTop: '2px'
                        }}
                    >
                        {rol && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#ffffff'
                                }}
                            >
                                ¡Hola, {rol}!
                            </div>
                        )}
                    </Grid>

                    <Grid
                        item
                        justifyContent={'flex-end'}
                        alignContent={'center'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Tooltip title={userName}>
                            <Avatar
                                src={stringConcat}
                                sx={{ width: '32px', height: '32px' }}
                            ></Avatar>
                        </Tooltip>

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

                {/* Mobile */}
                <Grid
                    container
                    justifyContent="space-between"
                    xs={11.5}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                    <Grid item>
                        <Menu name={name} paginaPrincipal={paginaPrincipal} />
                    </Grid>
                </Grid>

                <Grid xs={0.25} lg={1.5} />
            </Toolbar>
        </AppBar>
    );
};

export { Header, stringConcat };
