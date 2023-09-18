import { Grid, Paper, MenuItem, Select } from '@mui/material';
import { GridTop } from '../../atoms/GridTop';
import { Titulos } from '../../atoms/Title/Titulos';
import StickyHeadTable from '../Direccion/TablaDireccion';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { HeaderDirectivo } from '../../molecules/HeaderDirectivo';
import { HeaderSuperUsuario } from '../../molecules/HeaderSuperUsuario';
import TablaEquivalencias from '../../molecules/TablaEquivalencias';
import IconButton from '@mui/material/IconButton';

const PageDireccion = () => {
    const [searchQuery, setSearchQuery] = useState({
        value: '',
        column: 'dni'
    });
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

    const handleChange = (event) => {
        setSearchQuery((prevState) => ({
            ...prevState,
            column: event.target.value
        }));
    };

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
                        {rol == 'directivo' && (
                            <Link to="/direccionDashboard">
                                <IconButton sx={{ padding: 0 }}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Link>
                        )}
                        <Titulos component="h2" titulogrande>
                            Solicitudes de equivalencias
                        </Titulos>
                    </Grid>
                </GridTop>

                <GridTop
                    item
                    container
                    blanco="+true"
                    search
                    searchPlaceholder
                    searchProps
                    debounceSearchRender
                    xs={11.5}
                    md={9}
                    lg={7}
                    sx={{
                        height: '5rem',
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
                                    setSearchQuery((prevState) => ({
                                        ...prevState,
                                        value: e.target.value
                                    }));
                                }}
                                variant="outlined"
                                placeholder="Buscar"
                                sx={{ width: '220px' }}
                                onFocus={() => {
                                    iconSearch.current.style.display = 'none';

                                    inputSearch.current.style.margin =
                                        '6px 20px';
                                }}
                                onBlur={() => {
                                    iconSearch.current.style.display = 'block';

                                    inputSearch.current.style.margin =
                                        '0px 0px';
                                }}
                            />
                        </Paper>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchQuery.column}
                            label="Age"
                            onChange={handleChange}
                            size="small"
                            sx={{
                                marginLeft: '1%'
                            }}
                        >
                            <MenuItem value="dni">DNI</MenuItem>
                            <MenuItem value="solicitante">Solicitante</MenuItem>
                            <MenuItem value="estado">Estado</MenuItem>
                        </Select>
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
                    <TablaEquivalencias searchQuery={searchQuery} />
                    {/* <StickyHeadTable searchQuery={searchQuery} /> */}
                </GridTop>
            </Grid>
        </Grid>
    );
};

export { PageDireccion };
