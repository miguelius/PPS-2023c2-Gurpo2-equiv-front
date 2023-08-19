import React, { useState } from 'react';
import { TituloBienvenida, Titulos } from '../atoms/Title/Titulos';
import {
    OlvidastePassword,
    OlvidastePasswordLink
} from '../atoms/OlvidastePassword';
import LineaSeparacion from '../atoms/LineaSeparacion';
import { InputMUI, ContenedorInputs } from '../atoms/Input/InputMUI';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid, styled } from '@mui/material';
import { Formulario } from '../atoms/Formulario/Formulario';
import { useEffect } from 'react';
import { getUsuarios } from '../../services/usuario_service';

const FormularioInicioSesion = () => {
    const [dni, setDni] = useState(null);
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuariosData = async () => {
            const usuarios = await getUsuarios();

            setUsuarios(usuarios);
        };

        fetchUsuariosData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(usuarios);
        const usuario = usuarios.find(
            (usuario) => usuario.dni === dni && usuario.password === password
        );
        console.log(usuario);
        if (usuario) {
            localStorage.setItem('dni', JSON.stringify(usuario.dni));
            localStorage.setItem('nombre', JSON.stringify(usuario.nombre));
            localStorage.setItem('apellido', JSON.stringify(usuario.apellido));
            localStorage.setItem('email', JSON.stringify(usuario.email));
            localStorage.setItem('discord', JSON.stringify(usuario.discord));
            localStorage.setItem('telefono', JSON.stringify(usuario.telefono));
            localStorage.setItem('rol', JSON.stringify(usuario.rol));
            localStorage.setItem('password', JSON.stringify(usuario.password));
            localStorage.setItem('id', JSON.stringify(usuario.id));

            if (usuario.rol == 'alumno') {
                window.location.href = '/usuario/equivalencias';
            } else if (usuario.rol == 'directivo') {
                window.location.href = '/direccion/solicitudes';
            } else {
                window.location.href = '/superusuario/solicitudes';
            }
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <FormularioMain>
            <TituloBienvenida>
                <Titulos titulogrande titulomarginbottom component="h2">
                    ¡Bienvenido/a!
                </Titulos>
                <Titulos titulochico titulolight component="h2">
                    Iniciar sesión
                </Titulos>
            </TituloBienvenida>

            <Formulario sx={{ marginTop: '40px' }}>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    style={{ height: '100%', textAlign: 'center' }}
                >
                    <div>
                        <ContenedorInputs>
                            <InputMUI
                                type="text"
                                id="outlined-basic"
                                label="DNI"
                                variant="outlined"
                                onChange={(e) =>
                                    setDni(parseInt(e.target.value))
                                }
                                value={dni}
                            />
                        </ContenedorInputs>

                        <ContenedorInputs>
                            <InputMUI
                                type="password"
                                id="outlined-basic"
                                label="Contraseña"
                                variant="outlined"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </ContenedorInputs>
                    </div>

                    <OlvidastePassword>
                        <OlvidastePasswordLink href="https://www.google.com.ar">
                            ¿Olvidaste tu contraseña?
                        </OlvidastePasswordLink>
                    </OlvidastePassword>

                    <LineaSeparacion></LineaSeparacion>

                    <Grid>
                        <BotonMUI
                            variant="contained"
                            buttoncontained
                            disableElevation
                            type="submit"
                        >
                            Ingresar
                        </BotonMUI>
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

export { FormularioMain, FormularioInicioSesion };
