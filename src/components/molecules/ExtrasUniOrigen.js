import {
    Grid,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import { StandardInput, FileUploader } from '../atoms/Input/InputMUI';
import { Titulos } from '../atoms/Title/Titulos';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ExtrasUniOrigen = ({ handleChangeArray, formValueArray, key2 }) => {
    const [value, setValue] = useState(new Date());

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
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{
                    marginTop: '10px'
                }}
            >
                <Grid item container xs={5.6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year']}
                            label="Año aprobación"
                            name="datepicker"
                            onChange={(newValue) => setValue(newValue)}
                            value={value + 1}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    key={formValueArray.key}
                                    required
                                    name="anioAprobacion"
                                    sx={{
                                        marginTop: '15px'
                                    }}
                                    size="small"
                                    variant="outlined"
                                    type="number"
                                    value={
                                        (formValueArray.anioAprobacion = value
                                            .getFullYear()
                                            .toString())
                                    }
                                    onChange={(event) =>
                                        handleChangeArray(event, key2)
                                    }
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item container xs={5.6}>
                    <StandardInput
                        key={formValueArray.key}
                        required
                        name="cargaHorariaTotal"
                        size="small"
                        label="Carga horaria total"
                        variant="outlined"
                        type="number"
                        value={formValueArray.cargaHorariaTotal}
                        onChange={(event) => handleChangeArray(event, key2)}
                    />
                </Grid>
            </Grid>

            <Grid
                item
                container
                md={12}
                lg={5.8}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{
                    marginTop: '10px'
                }}
            >
                <Grid item container xs={5.6}>
                    <StandardInput
                        key={formValueArray.key}
                        required
                        name="notaAprobacion"
                        size="small"
                        label="Nota aprobación"
                        variant="outlined"
                        type="number"
                        value={formValueArray.notaAprobacion}
                        onChange={(event) => handleChangeArray(event, key2)}
                    />
                </Grid>

                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="flex-end"
                    xs={5.6}
                    marginTop="7px"
                >
                    <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ fontSize: '14px' }}>
                            ¿Tiene certificado?
                        </FormLabel>
                        <RadioGroup
                            required
                            row
                            aria-label="bool"
                            name="certificado"
                            value={formValueArray.certificado}
                            onChange={(event) => handleChangeArray(event, key2)}
                        >
                            <FormControlLabel
                                value={true}
                                control={<Radio size="small" />}
                                label="Si"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio size="small" />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid
                item
                container
                xs={12}
                sx={{
                    marginTop: '16px'
                }}
            >
                <Grid item container xs={12}>
                    <Titulos
                        titulolabel="true"
                        variant="h3"
                        fontSize={{
                            xs: '14px',
                            sm: '16px'
                        }}
                    >
                        Adjuntar programa de la materia .pdf
                    </Titulos>
                </Grid>

                <Grid item container xs={12} sx={{ marginTop: '16px' }}>
                    <label
                        htmlFor="contained-button-file"
                        style={{ width: '100%' }}
                    >
                        <BotonMUI
                            sx={{
                                marginRight: '12px'
                            }}
                            buttonupload="true"
                            variant="outlined"
                            component="span"
                        >
                            Cargar
                        </BotonMUI>
                    </label>
                </Grid>
            </Grid>
        </Grid>
    );
};

export { ExtrasUniOrigen };
