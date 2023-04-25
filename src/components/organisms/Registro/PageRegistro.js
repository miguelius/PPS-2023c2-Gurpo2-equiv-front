import React from 'react';
import { FatherContainer, TarjetaRegistro } from './RegistroStyled';
import FormularioRegistro from '../../molecules/FormularioRegistro';
import { Back } from '../../molecules/Side';

const PageRegistro = () => {
    console.log('Entre en la pagina');
    return (
        <FatherContainer>
            <TarjetaRegistro>
                <Back />
                <FormularioRegistro />
            </TarjetaRegistro>
        </FatherContainer>
    );
};

export default PageRegistro;
