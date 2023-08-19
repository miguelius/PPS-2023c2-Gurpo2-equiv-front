import React, { useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import { GridTop } from '../GridTop';
import { Titulos } from './atoms/Title/Titulos';
import SearchIcon from '@mui/icons-material/Search';
import TablaUsuarios from './TablaUsuarios';
import { HeaderSuperUsuario } from './HeaderSuperUsuario';
import { getUsuarios } from '../services/usuario_service';

const PageSuperUsuario = () => {
    const [rol, setRol] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [buscador, setBuscador] = useState('');

    useEffect(() => {
        const fetchUsuariosData = async () => {
            const usuarios = await getUsuarios();

            setUsuarios(usuarios);
        };

        fetchUsuariosData();
    }, []);

    const handleChangeBuscador = (event) => {
        setBuscador(event.target.value);
    };

    const handleChangeRol = (event) => {
        setRol(event.target.value);
    };

    return (
        <Grid container>
            <Grid item container xs={12}>
                <HeaderSuperUsuario />
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
                    sx={{ padding: '0px 20px' }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Titulos component="h2" titulogrande>
                            Usuarios
                        </Titulos>
                    </Grid>
                </GridTop>

                <Grid
                    item
                    container
                    xs={11.5}
                    md={7}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    <Box sx={{ mb: 2, maxWidth: 195 }}>
                        <TextField
                            id="Buscador"
                            type="search"
                            label="Buscar nombre o DNI"
                            variant="standard"
                            value={buscador}
                            onChange={handleChangeBuscador}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon
                                            sx={{
                                                color: 'action.active',
                                                mr: 1,
                                                my: 0.5
                                            }}
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <FormControl sx={{ minWidth: 130 }}>
                            <InputLabel
                                id="demo-simple-select-label"
                                variant="contained"
                            >
                                Rol
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={rol}
                                label="Rol"
                                onChange={handleChangeRol}
                                variant="standard"
                            >
                                <MenuItem value={'Todos'}>Todos</MenuItem>
                                <MenuItem value={'alumno'}>Alumno</MenuItem>
                                <MenuItem value={'directivo'}>
                                    Directivo
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <TablaUsuarios
                        rol={rol}
                        usuarios={usuarios}
                        buscador={buscador}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PageSuperUsuario;
