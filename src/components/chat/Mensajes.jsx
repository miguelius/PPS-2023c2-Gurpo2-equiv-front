import React, { useState } from 'react';
import cx from 'clsx';
import {
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';

import withStyles from '@material-ui/core/styles/withStyles';
import MensajesStyle from './MensajesStyle.js';
import AvatarIcon from '../AvatarIcon.jsx';
import { Fragment } from 'react';
import { cyan } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Mensajes = withStyles(MensajesStyle)((props) => {
    const { classes, mensajes, usuario_id } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredMessage, setHoveredMessage] = useState(null);

    const primerUltimoMensaje = (index, mensaje) =>
        index === 0 ||
        mensajes[index].id_remitente !== mensajes[index - 1].id_remitente
            ? classes[`${sidePorUsuario(mensaje)}First`]
            : index === mensajes.length - 1 ||
              mensajes[index].id_remitente !== mensajes[index + 1].id_remitente
            ? classes[`${sidePorUsuario(mensaje)}Last`]
            : '';

    const horaMensaje = (utcDatetimeString) => {
        const date = new Date(utcDatetimeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const fechaMensaje = (utcDatetimeString) => {
        const date = new Date(utcDatetimeString);
        return date.toLocaleDateString();
    };

    const sidePorUsuario = (mensaje) => {
        return mensaje.id_remitente === usuario_id ? 'right' : 'left';
    };

    const handleFecha = (index, mensaje) => {
        return index === 0 ||
            fechaMensaje(mensaje.createdAt) !==
                fechaMensaje(mensajes[index - 1].createdAt) ? (
            <Fragment>
                <Grid item xs={12}>
                    <Divider>
                        <Typography variant="body2" color="textSecondary">
                            {fechaMensaje(mensaje.createdAt)}
                        </Typography>
                    </Divider>
                </Grid>
            </Fragment>
        ) : (
            ''
        );
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMouseEnter = (index) => {
        setHoveredMessage(index);
    };

    const handleMouseLeave = () => {
        setHoveredMessage(null);
    };

    return (
        <Fragment>
            <Grid container>
                {mensajes.map((mensaje, i) => {
                    return (
                        <Fragment key={mensaje.id || i}>
                            {handleFecha(i, mensaje)}
                            {sidePorUsuario(mensaje) === 'left' ? (
                                <Grid key={mensaje.id || i} container item>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            paddingLeft: 7
                                        }}
                                    >
                                        {primerUltimoMensaje(i, mensaje) ===
                                            classes.leftFirst && (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: cyan[600],
                                                    fontWeight: 'bold',
                                                    paddingBottom: '0.2rem'
                                                }}
                                            >
                                                {mensaje.Usuario.nombre.trim() +
                                                    ' ' +
                                                    mensaje.Usuario.apellido.trim()}
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: '13px'
                                                    }}
                                                >
                                                    {' - ' +
                                                        mensaje.Usuario.rol[0]
                                                            .toUpperCase()
                                                            .trim() +
                                                        mensaje.Usuario.rol
                                                            .substring(1)
                                                            .trim()}
                                                </Typography>
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid container item xs={12}>
                                        {primerUltimoMensaje(i, mensaje) ===
                                            classes.leftFirst && (
                                            <AvatarIcon
                                                info={[
                                                    mensaje.Usuario.nombre.trim() +
                                                        ' ' +
                                                        mensaje.Usuario.apellido.trim()
                                                ]}
                                            />
                                        )}
                                        <Grid
                                            item
                                            xs={9}
                                            display="flex"
                                            justifyContent="flex-start"
                                            sx={{
                                                paddingLeft:
                                                    primerUltimoMensaje(
                                                        i,
                                                        mensaje
                                                    ) === classes.leftFirst
                                                        ? 1
                                                        : 6,
                                                paddingBottom:
                                                    primerUltimoMensaje(
                                                        i,
                                                        mensaje
                                                    ) === classes.leftLast
                                                        ? 2
                                                        : 0
                                            }}
                                        >
                                            <Typography
                                                align={'left'}
                                                className={cx(
                                                    classes.msg,
                                                    classes[
                                                        `${sidePorUsuario(
                                                            mensaje
                                                        )}`
                                                    ],
                                                    primerUltimoMensaje(
                                                        i,
                                                        mensaje
                                                    )
                                                )}
                                            >
                                                {mensaje.texto}
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: '0.7rem',
                                                        ml: 1
                                                    }}
                                                >
                                                    {horaMensaje(
                                                        mensaje.createdAt
                                                    )}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid
                                    key={mensaje.id || i}
                                    container
                                    item
                                    justifyContent="flex-end"
                                >
                                    <Grid
                                        item
                                        xs={10}
                                        display="flex"
                                        justifyContent="flex-end"
                                        sx={{
                                            paddingBottom:
                                                primerUltimoMensaje(
                                                    i,
                                                    mensaje
                                                ) === classes.rightLast
                                                    ? 2
                                                    : 0,
                                            position: 'relative'
                                        }}
                                        onMouseEnter={() =>
                                            handleMouseEnter(mensaje.id)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Typography
                                            className={cx(
                                                classes.msg,
                                                classes[
                                                    `${sidePorUsuario(mensaje)}`
                                                ],
                                                primerUltimoMensaje(i, mensaje)
                                            )}
                                        >
                                            {mensaje.texto}
                                            <Typography
                                                variant="caption"
                                                color="#7986cb"
                                                sx={{
                                                    fontSize: '0.7rem',
                                                    ml: 1
                                                }}
                                            >
                                                {horaMensaje(mensaje.createdAt)}
                                            </Typography>
                                            {hoveredMessage === mensaje.id && (
                                                <IconButton
                                                    onClick={(event) =>
                                                        handleMenuOpen(
                                                            event,
                                                            mensaje.id
                                                        )
                                                    }
                                                    sx={{
                                                        padding: 0,
                                                        backgroundColor:
                                                            '#3f51b5',
                                                        visibility: 'visible',
                                                        position: 'absolute',
                                                        right: 4,
                                                        top: 2,
                                                        rounded: '100%',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                '#3f51b5'
                                                        }
                                                    }}
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            )}
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={
                                                    Boolean(anchorEl) &&
                                                    hoveredMessage ===
                                                        mensaje.id
                                                }
                                                onClose={handleMenuClose}
                                                PaperProps={{
                                                    sx: {
                                                        overflow: 'visible',
                                                        mt: -1,
                                                        ml: -1,
                                                        width: 'auto',
                                                        borderRadius: 1,
                                                        boxShadow: 3
                                                    }
                                                }}
                                                transformOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'bottom'
                                                }}
                                                anchorOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'top'
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={handleMenuClose}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={handleMenuClose}
                                                >
                                                    Eliminar
                                                </MenuItem>
                                            </Menu>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        </Fragment>
                    );
                })}
            </Grid>
        </Fragment>
    );
});

export default Mensajes;
