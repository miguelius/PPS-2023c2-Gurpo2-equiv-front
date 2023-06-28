import { Button, Grid, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileUploader } from './components/atoms/Input/InputMUI';
import { BotonMUI } from './components/atoms/Button/BotonMUI';

const ArchivoAltaEquivalencia = ({
    handleChangeArray,
    formValueArray,
    key2
}) => {
    const [nombreArchivo, setNombreArchivo] = useState(null);

    const [file, setFile] = useState(null);

    const [fileList, setFileList] = useState([]);

    const [fileListUpdate, setFileListUpdate] = useState(false);

    // Hace una llamada a la API para obtener la lista de archivos
    useEffect(() => {
        if (nombreArchivo == null) {
            return;
        }

        fetch('http://localhost:3001/api/archivos/f/' + nombreArchivo, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((res) => setFileList(res))
            //.then(res => console.log(res))
            .catch((err) => {
                console.error(err);
            });
        setFileListUpdate(false);
    }, [fileListUpdate, nombreArchivo]);

    const handleSelectedFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSendFile = () => {
        if (!file) {
            alert('Debe seleccionar algún archivo');
            return;
        }

        const formdata = new FormData();
        formdata.append('uploadedPdf', file);
        formdata.append('filename', file.name);

        fetch('http://localhost:3001/api/archivos/', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                {
                    formValueArray.archivo = res;
                }
                setNombreArchivo(res);
                setFileListUpdate(true);
            })
            .catch((err) => {
                console.error(err);
            });

        document.getElementById('contained-button-file').value = null;
        setFile(null);
    };

    const handleDeleteFile = (f) => {
        fetch('http://localhost:3001/api/archivos/' + f, {
            method: 'DELETE'
        })
            .then((res) => res.text())
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        {
            formValueArray.archivo = null;
        }
        setNombreArchivo(null);
        setFileListUpdate(true);
    };

    return (
        <>
            <Grid xs={12}>
                <Grid item container sx={{ marginTop: '16px' }}>
                    {nombreArchivo != null && (
                        <Grid item container>
                            <p>Archivo Adjunto:</p>
                            <Grid
                                item
                                container
                                direction="column"
                                // justifyContent="space-between"
                                alignItems="flex-start"
                                sx={{ marginTop: '16px' }}
                            >
                                {[fileList].map((file) => (
                                    <Grid
                                        item
                                        container
                                        key={file}
                                        justifyContent="space-between"
                                        sx={{ marginTop: '5px' }}
                                    >
                                        <Link
                                            href={
                                                // 'http://localhost:3001/' + nombreArchivo
                                                'http://localhost:3001/api/archivos/' +
                                                file
                                            }
                                            target="_blank"
                                            underline="hover"
                                            color="#FF5733"
                                            display="inline"
                                        >
                                            {/* {nombreArchivo} */}
                                            {file}
                                        </Link>
                                        <BotonMUI //key={file}
                                            buttonupload
                                            variant="outlined"
                                            onClick={() =>
                                                handleDeleteFile(file)
                                            }
                                            // onClick={() => handleDeleteFile(nombreArchivo)}
                                        >
                                            Eliminar
                                        </BotonMUI>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                    {nombreArchivo != null && (
                        <Grid
                            item
                            container
                            sx={{ marginTop: '16px' }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                        >
                            <FileUploader
                                id="contained-button-file"
                                //multiple
                                size="large"
                                variant="standard"
                                type="file"
                                accept="application/*"
                                allowedextensions={['pdf']}
                                onChange={handleSelectedFile}
                                disabled
                            />
                            {/* </label> */}
                            <BotonMUI
                                // width='10%'
                                // sx={{
                                // marginRight: '12px'
                                // }}
                                buttonupload
                                variant="outlined"
                                // component="span"
                                /*Agregado*/
                                onClick={handleSendFile}
                                disabled
                                style={{
                                    backgroundColor: '#f4e4d3',
                                    fontColor: 'white'
                                }}
                                /*Fin Agregado*/
                            >
                                Cargar
                            </BotonMUI>
                        </Grid>
                    )}
                    {nombreArchivo == null && (
                        <Grid
                            item
                            container
                            sx={{ marginTop: '16px' }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                        >
                            <FileUploader
                                id="contained-button-file"
                                //multiple
                                size="large"
                                variant="standard"
                                type="file"
                                accept="application/*"
                                allowedextensions={['pdf']}
                                onChange={handleSelectedFile}
                            />
                            <br></br>
                            <br></br>
                            {/* </label> */}
                            <BotonMUI
                                // width='10%'
                                // sx={{
                                // marginRight: '12px'
                                // }}
                                buttonupload
                                variant="outlined"
                                // component="span"
                                /*Agregado*/
                                onClick={handleSendFile}
                                /*Fin Agregado*/
                            >
                                Cargar
                            </BotonMUI>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export { ArchivoAltaEquivalencia };
