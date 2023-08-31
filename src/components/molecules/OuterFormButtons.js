import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const OuterFormButtons = ({ handleSubmit, path, titulo, mensaje }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid
            item
            container
            xs={11.5}
            md={7}
            marginTop={{
                xs: '20px'
            }}
            sx={{
                padding: '20px 60px'
            }}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                xs={12}
                lg={6}
            >
                <Grid item container xs={6} lg={4}>
                    <BotonMUI
                        buttoncontainedsmall
                        // type="submit"
                        onClick={handleSubmit}
                        sx={{
                            marginRight: '12px',
                            width: '100%'
                        }}
                    >
                        Enviar
                    </BotonMUI>
                </Grid>

                <Grid item container xs={6} lg={4}>
                    {/* <Link
                        to="/home"
                        style={{ textDecoration: 'none', width: '100%' }}
                    >
                        <BotonMUI
                            buttonContainedSmall
                            type="submit"
                            sx={{
                                marginLeft: '12px',
                                width: '100%'
                            }}
                        >
                            Enviar
                        </BotonMUI>
                    </Link> */}

                    <BotonMUI
                        buttoncontainedcancel
                        sx={{
                            width: '100%'
                        }}
                        onClick={handleClickOpen}
                    >
                        Cancelar
                    </BotonMUI>
                </Grid>
            </Grid>

            <Grid
                item
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                lg={6}
            >
                {/* <BotonMUI buttonContainedAddEq>
                    Agregar equivalencia
                </BotonMUI> */}
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mensaje}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Link to={path} style={{ textDecoration: 'none' }}>
                        <Button>Aceptar</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export { OuterFormButtons };
