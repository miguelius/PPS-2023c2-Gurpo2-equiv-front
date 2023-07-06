import axios from 'axios';
import { config } from '../config/config';
import qs from 'qs';

export async function getEquivalencia(id) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/equivalencias/general/${id}`
    );
    return apiResponse.data;
}

export async function putEquivalencia(id) {
    const apiResponse = await axios.put(`${config.apiUrl}/equivalencias/${id}`);
    return apiResponse.data;
}

// export async function putArchivoMateriaAprobada(id) {
//     const apiResponse = await axios.put(`${config.apiUrl}/materias_aprobadas/archivo/${id}`);
//     return apiResponse.data;
// }

export async function putArchivoMateriaAprobada(id, archivo) {
    const data = {
        archivo: archivo
    };
    console.log('el ID es', id);
    console.log('DATA de la funcion', data);
    try {
        const apiResponse = await axios.put(
            `${config.apiUrl}/materias_aprobadas/archivo/${id}`,
            qs.stringify(data),
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
        );
        return apiResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al hacer la petición put para archivo');
    }
}
