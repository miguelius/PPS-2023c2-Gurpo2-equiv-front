import { Grid, Paper } from '@mui/material';
import { GridTop } from '../../../GridTop';
import { Titulos } from '../../atoms/Title/Titulos';
import StickyHeadTable from '../Direccion/TablaDireccion';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { HeaderDirectivo } from '../../HeaderDirectivo';
import { HeaderSuperUsuario } from '../../HeaderSuperUsuario';

const PageDireccion = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const rol = JSON.parse(localStorage.getItem('rol'));
    const rolUsuario = () => {
        if (rol === 'directivo') {
            return <HeaderDirectivo />;
        } else {
            return <HeaderSuperUsuario />;
        }
    };

    const iconSearch = React.createRef();
    const inputSearch = React.createRef();

    return (
        <Grid container direction="column">
            <Grid item container xs={12}>
                {rolUsuario()}
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
                        <Titulos component="h2" titulogrande>
                            Solicitudes de equivalencias
                        </Titulos>
                    </Grid>
                </GridTop>

                <GridTop
                    item
                    container
                    blanco
                    search
                    searchPlaceholder
                    searchProps
                    debounceSearchRender
                    xs={11.5}
                    md={7}
                    sx={{
                        height: '75px',
                        borderBottom: 'none',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px'
                    }}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        borderColor={'grey'}
                        xs={12}
                        sx={{
                            height: 'auto',
                            marginLeft: '40px'
                        }}
                    >
                        <Paper
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: 'none',
                                backgroundColor: 'rgba(245, 245, 245, 0.7)',
                                borderRadius: '10px',
                                width: '220px'
                            }}
                        >
                            {/* <IconButton
                                id="search-bar"
                                sx={{ p: '10px' }}
                                aria-label="search"
                            > */}
                            <SearchIcon
                                id="icon-search-bar"
                                ref={iconSearch}
                                sx={{
                                    m: '10px',
                                    color: 'rgba(0, 0, 0, 0.54)'
                                }}
                            />
                            {/* </IconButton> */}
                            <InputBase
                                id="search-bar"
                                ref={inputSearch}
                                className="text"
                                onInput={(e) => {
                                    e.preventDefault();
                                    setSearchQuery(e.target.value);
                                }}
                                variant="outlined"
                                placeholder="Buscar"
                                sx={{ width: '220px' }}
                                // Al hacer click en el input, ocultar boton
                                onFocus={(e) => {
                                    iconSearch.current.style.display = 'none';

                                    inputSearch.current.style.margin =
                                        '6px 20px';
                                }}
                                onBlur={(e) => {
                                    iconSearch.current.style.display = 'block';

                                    inputSearch.current.style.margin =
                                        '0px 0px';
                                }}
                            />

                            {/* <TextField
                                id="search-bar"
                                className="text"
                                onInput={(e) => {
                                    e.preventDefault();
                                    setSearchQuery(e.target.value);
                                }}
                                label="Buscar"
                                variant="outlined"
                                placeholder="DNI o Solicitante"
                                size="small"
                                sx={{ width: '300px' }}
                            /> */}
                            {/* <IconButton onClick={search()} aria-label="search">
                                    <SearchIcon style={{ fill: 'blue' }} />
                                </IconButton> */}
                        </Paper>
                    </Grid>
                </GridTop>
                <GridTop
                    item
                    container
                    blanco
                    xs={11.5}
                    md={7}
                    sx={{
                        height: 'auto',
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px'
                    }}
                >
                    <StickyHeadTable searchQuery={searchQuery} />
                </GridTop>
            </Grid>
        </Grid>
    );
};

export { PageDireccion };
