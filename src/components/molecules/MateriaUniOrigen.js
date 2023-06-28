import { Grid, TextField } from '@mui/material';
import React from 'react';
import { StandardInput, AutocompleteInput } from '../atoms/Input/InputMUI';

const MateriaUniOrigen = ({
    formValue,
    handleChangeArray,
    formValueArray,
    key2
}) => {
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
                md={12}
                lg={5.8}
                sx={{
                    marginTop: '6px'
                }}
            >
                <StandardInput
                    required
                    name="materiaAprobada"
                    size="small"
                    label="Materia aprobada"
                    variant="outlined"
                    value={formValueArray.materiaAprobada}
                    onChange={(event) => handleChangeArray(event, key2)}
                />
            </Grid>

            <Grid
                item
                container
                md={12}
                lg={5.8}
                sx={{
                    marginTop: '6px'
                }}
            >
                <AutocompleteInput
                    size="small"
                    variant="outlined"
                    onSelect={(event) => handleChangeArray(event, key2)}
                    disablePortal
                    options={top100Films}
                    renderInput={(params) => (
                        <TextField
                            required
                            {...params}
                            label="Universidad de Origen"
                            name="universidadOrigen"
                            value={(formValueArray.universidadOrigen = 1)}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

const top100Films = [
    { label: 'Universidad de la Matanza', year: 1994 },
    { label: 'Universidad de 3 de Febrero', year: 1972 },
    { label: 'Universidad de Morón', year: 1974 },
    { label: 'Universidad de Buenos Aires', year: 2008 }
];

export { MateriaUniOrigen };
