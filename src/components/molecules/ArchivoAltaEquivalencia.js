import { config } from '../../config/config';
import { Button, Grid, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileUploader } from '../atoms/Input/InputMUI';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Titulos } from '../atoms/Title/Titulos';
import {
    postArchivos,
    getArchivos,
    deleteArchivos,
    getLinkArchivos
} from '../../services/archivos_services';

const ArchivoAltaEquivalencia = ({
    handleChangeArray,
    formValueArray,
    key2
}) => {
    const [nombreArchivo, setNombreArchivo] = useState(null); //nombre del archivo
    const [nombreArchivoLocal, setNombreArchivoLocal] = useState(null); //almacena archivo local

    const [file, setFile] = useState(null); // archivo local

    const [fileList, setFileList] = useState([]); // ?

    const [fileListUpdate, setFileListUpdate] = useState(false); // ?

    // Hace una llamada a la API para obtener la lista de archivos
    useEffect(() => {
        if (nombreArchivo == null) {
            return;
        }

        fetch(config.apiUrl + '/api/archivos/f/' + nombreArchivo, {
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
        console.log('Esto hay cuando se selecciona' + e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleSendFile = async () => {
        if (!file) {
            alert('Debe seleccionar algún archivo');
            return;
        }

        const formdata = new FormData();
        formdata.append('uploadedPdf', file);
        formdata.append('filename', file.name);
        /*
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
        */
        await postArchivos(formdata)
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                const respuesta = JSON.parse(res); //se convierte respuesta
                console.log(respuesta[0].nombre);
                console.log(file.name);
                {
                    formValueArray.archivo = respuesta[0].nombre; //pasa un string con el nombre del archivo subido al server
                }
                setNombreArchivo(respuesta[0].nombre); // archivo local
                setNombreArchivoLocal(file.name); // nombre archivo almacenado en el server
                alert(respuesta[0].mensaje);
                setFileListUpdate(true);
            })
            .catch((err) => {
                console.error(err);
            });
        document.getElementById('contained-button-file').value = null;
        setFile(file);
    };

    const handleReadFile = async (archivo) => {
        await getArchivos(archivo)
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
            })
            .catch((error) => {
                alert(error[0].mensaje);
            });
    };

    const handleDeleteFile = async (e) => {
        /*fetch('http://localhost:3001/api/archivos/' + f, {
            method: 'DELETE'
        })*/
        await deleteArchivos(e)
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                const respuesta = JSON.parse(res);
                alert(respuesta[0].mensaje);
            })
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
                                                config.apiUrl + '/api/archivos/' +
                                                nombreArchivo
                                            }
                                            target="_blank"
                                            underline="hover"
                                            color="#FF5733"
                                            display="inline"
                                            xs={12}
                                        >
                                            {/* {nombreArchivo} */}
                                            {nombreArchivoLocal}
                                        </Link>

                                        <BotonMUI //key={file}
                                            buttonupload
                                            variant="outlined"
                                            onClick={() =>
                                                handleDeleteFile(nombreArchivo)
                                            }
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
                            <Grid xs={12}>
                                <Titulos
                                    titulolabel
                                    variant="h3"
                                    fontSize={{
                                        xs: '14px',
                                        sm: '16px'
                                    }}
                                >
                                    Adjunte un archivo BICHA .pdf:
                                </Titulos>
                            </Grid>
                            <Grid
                                sx={{ marginTop: '16px' }}
                                xs={12}
                                item
                                container
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
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export { ArchivoAltaEquivalencia };
