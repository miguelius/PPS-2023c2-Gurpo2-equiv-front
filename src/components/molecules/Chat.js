import { Titulos } from '../atoms/Title/Titulos';
import { Grid, TextField } from '@mui/material';

const Chat = ({ observaciones }) => {
    const mockChat = [
        {
            id: 1,
            rol: 'Profesor',
            mensaje:
                'Hola, como estas? Te informo que falta el analitico de la materia X'
        },
        {
            id: 2,
            rol: 'Alumno',
            mensaje: 'Hola, como estas? Te informo que lo acabo de subir'
        },
        {
            id: 3,
            rol: 'Profesor',
            mensaje: 'No es compatible con la materia X'
        },
        {
            id: 4,
            rol: 'Alumno',
            mensaje: 'Puede ser compatible con la materia X'
        }
    ];

    const chat = (event) => {};

    return (
        <>
            <Grid
                item
                xs={12}
                height="10%"
                borderBottom="1px solid black"
                display="flex"
                justifyContent="center"
                paddingTop="5px"
                backgroundColor="Azure"
            >
                <Titulos
                    fontFamily="Roboto"
                    textAlign="center"
                    paddingTop="12px"
                    fontWeight="medium"
                    fontSize={'24px'}
                >
                    Chat
                </Titulos>
            </Grid>
            <Grid item xs={12} height="80%">
                <Grid xs={12} item container direction="column" height="100%">
                    {mockChat.map((chat) => (
                        <TextField
                            id="filled-basic"
                            key={chat.id}
                            label={chat.rol}
                            variant="filled"
                            multiline
                            value={chat.mensaje}
                            name="observaciones"
                            focused={false}
                            InputProps={{
                                readOnly: true
                            }}
                            sx={{
                                width: '100%'
                            }}
                        />
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12} height="10%">
                <Grid xs={12} item container direction="column" height="100%">
                    <TextField
                        id="filled-basic"
                        placeholder="Escriba su mensaje aqui..."
                        multiline
                        name="observaciones"
                        onChange={chat}
                        rows={1}
                        sx={{
                            width: '100%',
                            marginTop: '10px'
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export { Chat };
