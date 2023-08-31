import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { css } from '@mui/styled-engine';

const GridTop = styled(Grid)`
    width: 1306px;
    height: 102px;
    border-radius: 10px;
    //padding: 0px 60px;

    ${(props) =>
        props.blanco &&
        css`
            background-color: #fff;
            border: 1px solid #dadce0;
        `}
`;

export { GridTop };
