import * as React from 'react';
import Mensajes from './Mensajes.jsx';
import { getMensajes, enviarMensaje } from '../../services/mensajes_service.js';
import {
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField
} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Fragment } from 'react';

const Chat = (props) => {
    const { id, socket } = props;
    const usuario_id = JSON.parse(localStorage.getItem('id'));
    const [mensajes, setMensajes] = useState([]);
    const [mensaje_input, setMensaje] = useState('');
    const paperRef = React.useRef(null);

    useEffect(() => {
        if (paperRef.current && mensajes.length > 0) {
            paperRef.current.scrollTop = paperRef.current.scrollHeight;
        }
    }, [mensajes]);

    useEffect(() => {
        const readMensajes = () => {
            getMensajes(id)
               .then((rpta) => {
                   if (Array.isArray(rpta.data) && rpta.data.length > 0) {
                       setMensajes(rpta.data);
                   }
               })
               .catch((error) => {
                   console.log('Error al obtener los mensajes:', error);
               });
           }
    
       // Set up event listener on mount
    socket.on('message', readMensajes);

    // Clean up the event listener on unmount
    return () => {
        socket.off('message', readMensajes);
    };
    }, [id, socket]);


    useEffect(() => {
        const readMensajes = () => {
            getMensajes(id)
               .then((rpta) => {
                   if (Array.isArray(rpta.data) && rpta.data.length > 0) {
                       setMensajes(rpta.data);
                   }
               })
               .catch((error) => {
                   console.log('Error al obtener los mensajes:', error);
               });
           }
        readMensajes();
    }, [id]);




    const handleChange = (e) => {
        setMensaje(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let objMensaje = {
            id_equivalencia: id,
            texto: mensaje_input,
            id_remitente: usuario_id,
            id: `${socket-id}${Math.random()}`,
            socketID: socket.id
        };
        enviarMensaje(objMensaje).then((rpta) => {
            setMensajes([...mensajes, rpta.data]);
            setMensaje('');
        });
        socket.emit('message', objMensaje);
    };

    return (
        <Fragment>
            <Paper
                elevation={8}
                variant="outlined"
                sx={{
                    width: '100%',
                    height: 500,
                    padding: 2,
                    mt: 4,
                    mb: 4,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div style={{ flex: 1, overflow: 'auto' }} ref={paperRef}>
                    <Mensajes mensajes={mensajes} usuario_id={usuario_id} socket={socket}/>
                </div>

                <Grid
                    container
                    spacing={1}
                    pt={1}
                    sx={{
                        padding: 2
                    }}
                >
                    <TextField
                        type="text"
                        label="Escribe un mensaje"
                        variant="outlined"
                        fullWidth
                        value={mensaje_input}
                        onChange={handleChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleSubmit}
                                        color="primary"
                                        size="medium"
                                        sx={{
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                cursor: 'pointer',
                                                transform: 'scale(1.1)'
                                            },
                                            '&:hover:not(:hover)': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                cursor: 'pointer',
                                                transform: 'scale(1)'
                                            }
                                        }}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Paper>
        </Fragment>
    );
};

export default Chat;
