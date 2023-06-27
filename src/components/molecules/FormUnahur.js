import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AutocompleteInput } from '../atoms/Input/InputMUI';
import { Titulos } from '../atoms/Title/Titulos';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';

const FormUnahur = ({
    formValue,
    carreras,
    materias,
    handleChangeCarrera,
    handleChangeMateriaUnaHur,
    handledelete,
    handledelete2,
    handleEliminar
}) => {
    return (
        <React.Fragment>
            <Grid
                item
                container
                direction="column"
                alignItems="flex-start"
                sx={{
                    marginTop: '6px'
                }}
            >
                <Titulos titulolabel="true" component="h2">
                    Datos Universidad Nacional de Hurlingham
                </Titulos>
            </Grid>

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
                    alignItems="flex-start"
                    md={12}
                    lg={6}
                    marginTop={{
                        lg: '30px'
                    }}
                >
                    Seleccione la carrera UNAHUR para la que solicitará
                    equivalencias
                </Grid>
                <Grid
                    item
                    container
                    md={12}
                    lg={6}
                    sx={{
                        marginTop: '1rem'
                    }}
                >
                    <AutocompleteInput
                        size="small"
                        variant="outlined"
                        onSelect={(event) => handleChangeCarrera(event)}
                        disablePortal
                        options={carreras}
                        sx={{
                            marginTop: '1rem'
                        }}
                        renderInput={(params) => (
                            <TextField
                                required
                                {...params}
                                key={formValue.carreras}
                                label="Carreras UNAHUR"
                                name="carreraUnahur"
                                value={' ' || formValue.carreras}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={12} xs={12} marginTop="30px">
                    <Titulos titulolabel="true" component="h2">
                        Materias solicitadas
                    </Titulos>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    {materias.map((materia) => {
                        return (
                            <Box
                                sx={{
                                    marginTop: '6px',
                                    width: '45%'
                                }}
                                key={materia.key}
                            >
                                <Grid>
                                    <TextField
                                        required
                                        name={materia.materiaUnahur}
                                        sx={{
                                            width: '80%'
                                        }}
                                        size="small"
                                        label="Materia solicitada UNAHUR"
                                        variant="outlined"
                                        value={materia.materiaUnahur}
                                        onChange={(event) =>
                                            handleChangeMateriaUnaHur(
                                                event,
                                                materia.key
                                            )
                                        }
                                    />
                                    <IconButton
                                        sx={{ color: '#5f6368' }}
                                        aria-label="upload picture"
                                        onClick={() => {
                                            if (materias.length > 1) {
                                                handleEliminar(false);
                                                handledelete(materia);
                                            } else {
                                                handledelete2();
                                            }
                                        }}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Grid>
                            </Box>
                        );
                    })}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default FormUnahur;
