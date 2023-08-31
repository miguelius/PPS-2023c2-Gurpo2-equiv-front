import { Grid, TextField } from '@mui/material';
import React from 'react';
import { StandardInput, AutocompleteInput } from '../atoms/Input/InputMUI';
import { useState, useEffect } from 'react';
import { getInstitucionesHabilitadas } from '../../services/institucionService';

const MateriaUniOrigen = ({
    formValue,
    handleChangeArray,
    formValueArray,
    key2
}) => {
    const [universidades, setUniversidades] = useState([]);

    useEffect(() => {
        const fetchUniversidades = async () => {
            try {
                const universidades = await getInstitucionesHabilitadas();
                setUniversidades(universidades);
            } catch (error) {
                console.error('Error al obtener las universidades:', error);
            }
        };

        fetchUniversidades();
    }, []);

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
                    //(event) => handleChangeArray(event)
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
                {/* <StandardInput
                    key={formValueArray.key}
                    required
                    name="universidadOrigen"
                    size="small"
                    label="Universidad de Origen"
                    variant="outlined"
                    value={formValueArray.universidadOrigen}
                    onChange={(event) => handleChangeArray(event, key2)}
                /> */}

                <AutocompleteInput
                    size="small"
                    variant="outlined"
                    onChange={(event, selectedOption) => {
                        console.log('selectedOption:', selectedOption);
                        const universidadSeleccionada = universidades.find(
                            (universidad) =>
                                universidad.nombre_universidad ===
                                selectedOption
                        );
                        console.log(
                            'universidadSeleccionada:',
                            universidadSeleccionada
                        );
                        const idUniversidadSeleccionada =
                            universidadSeleccionada
                                ? universidadSeleccionada.id
                                : null;
                        console.log(
                            'idUniversidadSeleccionada:',
                            idUniversidadSeleccionada
                        );
                        handleChangeArray(
                            {
                                target: {
                                    name: 'universidadOrigen',
                                    value: idUniversidadSeleccionada
                                }
                            },
                            key2
                        );
                    }}
                    disablePortal
                    options={universidades.map(
                        (universidad) => universidad.nombre_universidad
                    )}
                    renderInput={(params) => (
                        <TextField
                            required
                            {...params}
                            label="Universidad de Origen"
                            name="universidadOrigen"
                            value={formValueArray.universidadOrigen || ''}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

export { MateriaUniOrigen };
