import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { css } from '@mui/styled-engine';

const GridTop = styled(Grid)`
    width: auto;
    height: 102px;

    //padding: 0px 60px;
    margin: 5px;
    ${(props) =>
        props.blanco &&
        css`
            background-color: #fff;
            border: 1px solid #dadce0;
        `}
`;

export { GridTop };
