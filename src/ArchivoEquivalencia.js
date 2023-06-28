import { Button, Grid, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileUploader } from './components/atoms/Input/InputMUI';
import { BotonMUI } from './components/atoms/Button/BotonMUI';
import { StandardInput } from './components/atoms/Input/InputMUI';

const rol = JSON.parse(localStorage.getItem('rol'));

const ArchivoEquivalencia = ({ estado, nArchivo, materiaAprobada }) => {
    const [nombreArchivo, setNombreArchivo] = useState(nArchivo);

    const [file, setFile] = useState(null);

    const [fileList, setFileList] = useState([]);

    const [fileListUpdate, setFileListUpdate] = useState(false);

    // Hace una llamada a la API para obtener la lista de archivos
    useEffect(() => {
        if (nombreArchivo == null) {
            return;
        }
        console.log('Rol:' + rol);
        console.log('nArchivo: ' + nArchivo);

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
    }, [fileListUpdate, nArchivo, nombreArchivo]);

    const handleSelectedFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSendFile = () => {
        if (!file) {
            alert('Debe seleccionar algún archivo');
            return;
        }

        const formdata = new FormData();
        formdata.append('archivopdf', file);

        fetch('http://localhost:3001/api/archivos/', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                {
                    materiaAprobada.archivo = res;
                }
                setNombreArchivo(res);
                setFileListUpdate(true);
            })
            .catch((err) => {
                console.error(err);
            });

        // document.getElementById("algo").value = file

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
        setNombreArchivo(null);
        setFileListUpdate(true);
    };

    return (
        <>
            {nombreArchivo != null &&
                (rol == 'directivo' ||
                    ((estado == 'aceptado' ||
                        estado == 'Aceptado' ||
                        estado == 'Rechazado') &&
                        rol == 'alumno')) && (
                    <Grid sx={{ marginTop: '16px' }}>
                        {[fileList].map((file) => (
                            <Grid
                                item
                                container
                                key={file}
                                justifyContent="space-between"
                                sx={{ marginTop: '5px' }}
                            >
                                <Link
                                    //key={file}
                                    href={
                                        'http://localhost:3001/api/archivos/' +
                                        file
                                    }
                                    target="_blank"
                                    underline="hover"
                                    color="#FF5733"
                                    display="inline"
                                    xs={12}
                                >
                                    {file}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                )}
            <Grid xs={12}>
                {nombreArchivo != null &&
                    (estado == 'Falta completar' || estado == 'Pendiente') &&
                    rol == 'alumno' && (
                        <Grid item container sx={{ marginTop: '16px' }}>
                            <Grid
                                item
                                container
                                direction="column"
                                // justifyContent="space-between"
                                alignItems="flex-start"
                                sx={{ marginTop: '12px' }}
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
                                            //key={file}
                                            href={
                                                'http://localhost:3001/api/archivos/' +
                                                file
                                            }
                                            target="_blank"
                                            underline="hover"
                                            color="#FF5733"
                                            display="inline"
                                        >
                                            {file}
                                        </Link>
                                        <BotonMUI //key={file}
                                            buttonupload
                                            variant="outlined"
                                            onClick={() =>
                                                handleDeleteFile(file)
                                            }
                                        >
                                            Eliminar
                                        </BotonMUI>
                                    </Grid>
                                ))}
                            </Grid>
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
                                <BotonMUI
                                    buttonuploadoff
                                    variant="outlined"
                                    onClick={handleSendFile}
                                    disabled
                                    style={{
                                        backgroundColor: '#f4e4d3',
                                        fontColor: 'white'
                                    }}
                                >
                                    Cargar
                                </BotonMUI>
                            </Grid>
                        </Grid>
                    )}
                {nombreArchivo == null &&
                    (estado == 'Falta completar' || estado == 'Pendiente') &&
                    rol == 'alumno' && (
                        <Grid
                            item
                            container
                            sx={{ marginTop: '16px' }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                        >
                            {/* <label
                            htmlFor="contained-button-file"
                            style={{ width: '100%' }}
                            ></label>  */}
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
                            {/* </label> */}
                            <BotonMUI
                                buttonupload
                                variant="outlined"
                                onClick={handleSendFile}
                            >
                                Cargar
                            </BotonMUI>
                        </Grid>
                    )}
            </Grid>
        </>
    );
};

export { ArchivoEquivalencia };
