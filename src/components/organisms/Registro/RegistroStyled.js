import { Grid, styled } from '@mui/material';

const TarjetaRegistro = styled(Grid)`
    margin: 0 auto;
    width: 960px;
    max-width: 960px;
    height: 550px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.7);
    background-color: #fff;
    display: flex;
    align-self: center;
`;

const FatherContainer = styled(Grid)`
    height: 100%;
    display: flex;
    position: fixed;
    width: 100%;
    background-color: #122c34;
`;

export { TarjetaRegistro, FatherContainer };
