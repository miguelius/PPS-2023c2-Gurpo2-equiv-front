import React from 'react';
import { useEffect, useState } from 'react';
import { getInsitutciones } from '../../../services/institucionService';
import { FatherContainer } from './RegistroStyled';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import Header from '../../molecules/Header/Header';

const PageInstituciones = () => {
    const [listaInstituciones, setListaInstituciones] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'nombreInstitucion',
            headerName: 'Nombre de institución',
            width: 150,
            editable: false
        },
        {
            field: 'localidad',
            headerName: 'Localidad',
            width: 150,
            editable: false
        },
        {
            field: 'sigla',
            headerName: 'Sigla',
            width: 110,
            editable: false
        }
    ];

    useEffect(() => {
        const fetchInstituciones = async () => {
            const instituciones = await getInsitutciones({
                limit: limit,
                page: currentPage
            });
            const institucionesListadas = instituciones.items;
            setListaInstituciones(institucionesListadas);
            setTotalPages(instituciones.totalPages);
        };
        fetchInstituciones();
    }, [currentPage, limit]);

    return (
        <FatherContainer>
            <Grid container direction="column">
                <Grid item container xs={12}>
                    <Header name="Instituciones" paginaPrincipal="/" />
                </Grid>
                <Grid item container xs={12}>
                    <DataGrid
                        rows={listaInstituciones}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: limit,
                                    page: currentPage
                                },
                                onPageChange: (params) => {
                                    setPage(params.page);
                                    setCurrentPage(params.page);
                                }
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </FatherContainer>
    );
};
export default PageInstituciones;
