import { Button, Grid, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileUploader } from '../atoms/Input/InputMUI';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { StandardInput } from '../atoms/Input/InputMUI';
import { Titulos } from '../atoms/Title/Titulos';
import { OuterFormButtons } from './OuterFormButtons';
import { putArchivoMateriaAprobada } from '../../services/revision';
import {
    postArchivos,
    getArchivos,
    deleteArchivos,
    getLinkArchivos
} from '../../services/archivos_services';

const rol = JSON.parse(localStorage.getItem('rol'));

const ArchivoEquivalencia = ({ estado, nArchivo, materiaAprobada }) => {
    const [nombreArchivo, setNombreArchivo] = useState(nArchivo);

    const [file, setFile] = useState(null);

    const [fileList, setFileList] = useState([]);

    const [fileListUpdate, setFileListUpdate] = useState(false);

    const [fileLink, setFileLink] = useState(null);

    // Hace una llamada a la API para obtener la lista de archivos
    useEffect(() => {
        if (nombreArchivo == null) {
            return;
        }
        /*
        fetch('http://localhost:3001/api/archivos/f/' + nombreArchivo, {
            method: 'GET'
        })
        getLinkArchivos(nArchivo)
            .then((res) => res.json())
            .then((res) => setFileList(res))
            .catch((err) => {
                console.error(err);
            });
        */
        setFile(nArchivo);
        setFileList(file);
        setFileListUpdate(false);
        setFileLink(getLinkArchivos(nombreArchivo));
        console.log('Rol:' + rol);
        console.log('nArchivo: ' + nArchivo);
        console.log('nombreArchivo: ' + nombreArchivo);
        console.log('Archivo en la lista: ' + fileList);
        console.log('Link archivo ' + getLinkArchivos(nombreArchivo));
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
        formdata.append('uploadedPdf', file);
        formdata.append('filename', file.name);
        console.log('Nombre del archivo' + file.name);

        fetch('http://localhost:3001/api/archivos/', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.text())
            .then((res) => {
                console.log('El nombre del archivo devuelto es: ' + res);
                {
                    materiaAprobada.archivo = res;
                }
                setNombreArchivo(res);
                putArchivoMateriaAprobada(materiaAprobada.id, res);
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
        console.log('Materia probada id: ' + materiaAprobada.id);
        setNombreArchivo(null);
        putArchivoMateriaAprobada(materiaAprobada.id);
        setFileListUpdate(true);
    };

    return (
        <>
            {nombreArchivo != null &&
                {
                    /*
                (rol == 'directivo' ||
                    ((estado == 'aceptado' ||
                        estado == 'Aceptado' ||
                        estado == 'Rechazado') &&
                        rol == 'alumno')) */
                } && (
                    <Grid item container sx={{ marginTop: '16px' }}>
                        <p>Archivo Adjunto:</p>
                        {[fileList].map((files) => (
                            <Grid
                                item
                                container
                                key={files}
                                justifyContent="space-between"
                                sx={{ marginTop: '5px' }}
                            >
                                <Grid container sx={{ marginTop: '14px' }}>
                                    <Link
                                        //key={file}
                                        href={fileLink}
                                        target="_blank"
                                        underline="hover"
                                        color="#FF5733"
                                        display="inline"
                                        xs={12}
                                    >
                                        {nombreArchivo}
                                    </Link>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                )}
            <Grid xs={12}>
                {nombreArchivo != null &&
                    (estado == 'Falta completar' ||
                        estado == 'Pendiente' ||
                        estado == 'pendiente') &&
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
                                <Titulos
                                    titulolabel
                                    variant="h3"
                                    fontSize={{
                                        xs: '14px',
                                        sm: '16px'
                                    }}
                                >
                                    Archivo Adjunto:
                                </Titulos>

                                <Grid item container sx={{ marginTop: '16px' }}>
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
                                            {/* <OuterFormButtons
                                            handleSubmit={handleDeleteFile(file)}
                                            path={''}
                                            titulo={'Eliminar Archivo'}
                                            mensaje={
                                                '¿Está seguro/a de que desea eliminar el archivo?'
                                            }
                                        /> */}
                                        </Grid>
                                    ))}
                                </Grid>
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
                            <Grid xs={12}>
                                <Titulos
                                    titulolabel
                                    variant="h3"
                                    fontSize={{
                                        xs: '14px',
                                        sm: '16px'
                                    }}
                                >
                                    Adjunte un archivo .pdf:
                                </Titulos>
                            </Grid>
                            {/* <label
                                htmlFor="contained-button-file"
                                style={{ width: '100%' }}
                                ></label>  */}
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
                                {/* </label> */}
                                <BotonMUI
                                    buttonupload
                                    variant="outlined"
                                    onClick={handleSendFile}
                                >
                                    Cargar
                                </BotonMUI>
                            </Grid>
                        </Grid>
                    )}
            </Grid>
        </>
    );
};

export { ArchivoEquivalencia };
