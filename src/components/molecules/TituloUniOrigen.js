import { Grid, Button } from '@mui/material';
import React from 'react';
import { Titulos } from '../atoms/Title/Titulos';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { color } from '@mui/system';

const TituloUniOrigen = () => {
    return (
        <Grid
            item
            container
            xs={12}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Grid
                item
                container
                direction="column"
                alignItems="flex-start"
                md={12}
                lg={5.8}
                sx={{
                    marginTop: '6px'
                }}
            >
                <Titulos titulolabel component="h2">
                    Datos Universidad Origen
                </Titulos>
            </Grid>

            <Grid
                item
                container
                direction="column"
                alignItems="flex-end"
                md={12}
                lg={5.8}
                sx={{
                    marginTop: '6px'
                }}
            >
                <IconButton
                    sx={{ color: '#5f6368' }}
                    aria-label="upload picture"
                    component="span"
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export { TituloUniOrigen };
