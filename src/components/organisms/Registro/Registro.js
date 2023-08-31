import React from 'react';
import { Grid, styled } from '@mui/material';

const Registro = () => {
    return <FormularioMain></FormularioMain>;
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

export { Registro };
