import { Paper } from '@mui/material';
import styled from 'styled-components';

const Item = styled(Paper)(({ theme }) => ({
    height: 'auto',
    width: '100%',
    textAlign: 'center',
    borderRadius: '10px 10px 0px 0px'
}));

export { Item };
