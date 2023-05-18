import { Container, Grid, styled } from '@mui/material';

const FatherContainer = styled(Grid)`
    height: 100%;
    display: flex;
    position: fixed;
    width: 100%;
    background-color: #122c34;
`;

const ContainerTitle = styled(Container)`
    display: flex;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;

const ContainerCenter = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2.5rem;
    padding-bottom: 0.5rem;
`;

const ContainerCenterButton = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;

const ContainerPagination = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const ContainerFlexDirection = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export {
    FatherContainer,
    ContainerCenter,
    ContainerPagination,
    ContainerFlexDirection,
    ContainerCenterButton,
    ContainerTitle
};
