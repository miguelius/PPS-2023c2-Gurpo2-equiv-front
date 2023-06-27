import { Grid } from '@mui/material';
import React from 'react';
import { DatosMateriaUniOrigen } from './DatosMateriaUniOrigen';
import { ExtrasUniOrigen } from './ExtrasUniOrigen';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Titulos } from '../atoms/Title/Titulos';

const FormUniOrigen = ({
    handledelete,
    handleChangeArray,
    formValueArray,
    key2
}) => {
    return (
        <Grid
            item
            container
            padding={{
                xs: '20px 30px',
                sm: '20px 60px'
            }}
            sx={{ borderTop: '1px solid #DADCE0' }}
        >
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
                    <Titulos titulolabel="true" component="h2">
                        Datos Universidad Origen
                    </Titulos>
                </Grid>
                <IconButton
                    sx={{ color: '#5f6368' }}
                    aria-label="upload picture"
                    component="span"
                    onClick={handledelete}
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Grid>

            <DatosMateriaUniOrigen
                handleChangeArray={handleChangeArray}
                formValueArray={formValueArray}
                key2={key2}
            />

            <ExtrasUniOrigen
                handleChangeArray={handleChangeArray}
                formValueArray={formValueArray}
                key2={key2}
            />
        </Grid>
    );
};

export { FormUniOrigen };
