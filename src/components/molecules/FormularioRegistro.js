import React, { useState } from 'react';
import { TituloBienvenida, Titulos } from '../atoms/Title/Titulos';
import {
    InputMUI,
    ContenedorInputs,
    StandardInput
} from '../atoms/Input/InputMUI';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import {
    Checkbox,
    Grid,
    InputLabel,
    MenuItem,
    Snackbar,
    styled,
    Select
} from '@mui/material';
import { Formulario } from '../atoms/Formulario/Formulario';
import { postUsuarios } from '../../services/usuario_service';

import { GridTop } from '../../GridTop';

import bcrypt from 'bcryptjs';

const FormularioRegistro = () => {
    const [role, setRole] = useState('alumno');

    const changeRole = (event) => {
        setRole(event.target.value);
    };

    const [formValue, setFormValue] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        email: '',
        discord: '',
        telefono: '',
        rol: role,
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            dni,
            nombre,
            apellido,
            email,
            discord,
            telefono,
            rol,
            password
        } = formValue;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const response = await postUsuarios(
            dni,
            nombre,
            apellido,
            email,
            discord,
            telefono,
            rol,
            hashedPassword
        );

        console.log('response', response);
        // rompe porq hay response.data.status en la respuesta
        if (response.data.status === 200) {
            alert('Registro exitoso!');
            window.location.href = '/';
        } else {
            alert('Ocurrió un error. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <FormularioMain
            item
            container
            blanco
            xs={11.5}
            md={7}
            marginTop={{
                xs: '30px'
            }}
            sx={{
                height: 'auto'
            }}
        >
            <Formulario
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sm={12}
                padding={{
                    xs: '20px 30px',
                    sm: '20px 60px'
                }}
                sx={{
                    height: 'auto',
                    borderRadius: '10px 10px 0px 0px'
                }}
            >
                <form
                    action=""
                    onSubmit={handleSubmit}
                    style={{ height: '100%', textAlign: 'center' }}
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
                        <Titulos titulomarginbottom component="h2">
                            Registrate
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
                            direction="column"
                            alignItems="flex-start"
                            md={12}
                            lg={5.8}
                            sx={{
                                marginTop: '6px'
                            }}
                        >
                            <StandardInput
                                required
                                name="dni"
                                size="small"
                                label="DNI"
                                variant="outlined"
                                value={formValue.dni}
                                onChange={handleChange}
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
                            <StandardInput
                                required
                                name="email"
                                size="small"
                                label="Correo electrónico"
                                variant="outlined"
                                value={formValue.email}
                                onChange={handleChange}
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
                            <StandardInput
                                required
                                name="nombre"
                                size="small"
                                label="Nombre"
                                variant="outlined"
                                value={formValue.nombre}
                                onChange={handleChange}
                            />
                        </Grid>

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
                            <StandardInput
                                required
                                name="apellido"
                                size="small"
                                label="Apellido"
                                variant="outlined"
                                value={formValue.apellido}
                                onChange={handleChange}
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
                            <StandardInput
                                required
                                name="telefono"
                                size="small"
                                label="Telefono"
                                variant="outlined"
                                value={formValue.telefono}
                                onChange={handleChange}
                            />
                        </Grid>

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
                            <StandardInput
                                required
                                name="discord"
                                size="small"
                                label="Discord"
                                variant="outlined"
                                value={formValue.discord}
                                onChange={handleChange}
                            />
                        </Grid>

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
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Rol"
                                onChange={changeRole}
                            >
                                <MenuItem value={'alumno'}>Alumno</MenuItem>
                                <MenuItem value={'directivo'}>
                                    Directivo
                                </MenuItem>
                            </Select>
                        </Grid>

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
                            <StandardInput
                                required
                                name="password"
                                size="small"
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                value={formValue.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                                borderTop: '1px solid #DADCE0',
                                marginTop: '20px ',
                                padding: '0px 40px'
                            }}
                        >
                            <BotonMUI
                                buttoncontained
                                variant="outlined"
                                sx={{ margin: '10px 0px' }}
                                onClick={handleSubmit}
                                type="submit"
                            >
                                Registrarse
                            </BotonMUI>
                        </Grid>
                    </Grid>
                </form>
            </Formulario>
        </FormularioMain>
    );
};

const FormularioMain = styled(Grid)`
    width: 65%;
    max-width: 65%;
    height: 100%;
    padding: 50px 0px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default FormularioRegistro;
