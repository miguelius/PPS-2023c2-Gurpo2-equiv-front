import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { stringConcat } from './Header';
import { Grid, Typography } from '@mui/material';
import { Titulos } from '../atoms/Title/Titulos';

export default function Menu({ name, paginaPrincipal }) {
    const nombre = JSON.parse(localStorage.getItem('nombre'));
    const apellido = JSON.parse(localStorage.getItem('apellido'));
    const email = JSON.parse(localStorage.getItem('email'));
    const rol = JSON.parse(localStorage.getItem('rol'));

    const [state, setState] = useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Grid
                item
                justifyContent={'flex-start'}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 0px 8px 16px'
                }}
            >
                <img
                    src={stringConcat}
                    alt=""
                    style={{ borderRadius: '100%' }}
                    width={'40px'}
                />
            </Grid>
            <Grid
                item
                justifyContent={'flex-start'}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px 16px'
                }}
            >
                {nombre && apellido ? (
                    <strong>
                        {nombre} {apellido}
                    </strong>
                ) : (
                    ''
                )}
            </Grid>

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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-all',
                        wordWrap: 'break-word'
                    }}
                >
                    <Typography>
                        {email ? (
                            <span style={{ color: '#71767b' }}>{email}</span>
                        ) : (
                            ''
                        )}
                    </Typography>
                </Box>
            </Grid>

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
                {rol ? (
                    <span style={{ color: '#71767b' }}>Rol: {rol}</span>
                ) : (
                    ''
                )}
            </Grid>

            <List sx={{ marginTop: '8px' }}>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={paginaPrincipal}>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        component="a"
                        href="/"
                        onClick={() => {
                            localStorage.clear();
                        }}
                    >
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Grid item container alignItems={'center'}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer('left', true)}
                        >
                            <img
                                src={stringConcat}
                                alt=""
                                style={{ borderRadius: '100%' }}
                                width={'32px'}
                            />
                        </IconButton>
                        <Grid>
                            <Titulos
                                variant="subtitle1"
                                style={{ color: 'white', marginLeft: '8px' }}
                            >
                                Trámites de Equivalencias
                            </Titulos>
                        </Grid>
                    </Grid>

                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export { Menu };
