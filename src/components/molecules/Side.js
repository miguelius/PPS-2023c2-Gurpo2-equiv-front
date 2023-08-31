import styled from 'styled-components';
import { Registro, FormularioMain } from '../organisms/Registro/Registro';
import { Titulos } from '../atoms/Title/Titulos';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const SideBack = styled(Grid)`
    background: #009673;
    width: 35%;
    max-width: 35%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const Back = () => {
    const onClick = (e) => {
        return <Registro />;
    };

    return (
        <SideBack>
            <Titulos centrar blanco titulogrande titulobold component="h1">
                Trámites de Equivalencias
            </Titulos>

            <Link to="/" style={{ textDecoration: 'none' }}>
                <BotonMUI buttonoutlined variant="outlined" onClick={onClick}>
                    Volver
                </BotonMUI>
            </Link>
        </SideBack>
    );
};

export { SideBack, Back };
