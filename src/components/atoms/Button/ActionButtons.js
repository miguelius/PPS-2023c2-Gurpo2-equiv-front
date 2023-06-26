import { Grid, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';

const ActionButtons = (color) => {
    return (
        <Grid
            container
            item
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <IconButton aria-label="see" color={color.color}>
                <VisibilityIcon />
            </IconButton>
        </Grid>
    );
};

export { ActionButtons };
