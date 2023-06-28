import { styled } from '@mui/material';
import Fab from '@mui/material/Fab';

const FabButton = styled(Fab)`
    position: absolute;
    bottom: 50px;
    right: 20px;
    background-color: #009673;
    color: #fff;

    .MuiTouchRipple-child {
        background-color: #009673;
    }
`;

export { FabButton };
