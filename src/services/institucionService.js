import axios from 'axios';
import { config } from '../config/config';
import qs from 'qs';

//revisar en estos dos casos si esta bien q sea apiResponse.data
export async function getInsitutciones({ limit, page }) {
    console.log('-----------------');
    console.log('ENTRE A LA FUNCION');
    console.log('El limite es', limit);
    console.log('La pagina es', page);
    try {
        const apiResponse = await axios.get(
            `${config.apiUrl}/universidades_origenes/todas`,
            {
                params: {
                    limit: limit,
                    page: page
                }
            }
        );
        console.log('API RESPONSE', apiResponse);
        return apiResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al hacer la petición get');
    }
}

export async function getInstitucionesHabilitadas() {
    const apiResponse = await axios.get(
        `${config.apiUrl}/universidades_origenes/todas/enabled`
    );
    return apiResponse.data;
}

export async function getInstitucion(id) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/universidades_origenes/${id}`
    );
    return apiResponse.data;
}
//revisar q funcionen bien
export async function postInstituciones(nombre, localidad, sigla) {
    console.log('ENTRE A LA FUNCION POST');
    const data = {
        nombre: nombre,
        localidad: localidad,
        sigla: sigla
    };
    console.log('DATA', data);
    try {
        const apiResponse = await axios.post(
            `${config.apiUrl}/universidades_origenes`,
            qs.stringify(data),
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
        );
        console.log('API RESPONSE', apiResponse);
        return apiResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al hacer la petición post');
    }
}
export async function putInstituciones(nombre, direccion, sigla, id) {
    const data = {
        nombre: nombre,
        localidad: direccion,
        sigla: sigla,
        disabled: false
    };
    console.log('el ID es', id);
    console.log('DATA de la funcion', data);
    try {
        const apiResponse = await axios.put(
            `${config.apiUrl}/universidades_origenes/${id}`,
            qs.stringify(data),
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
        );

        return apiResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al hacer la petición post');
    }
}

export async function disabledInstituciones(id) {
    try {
        const apiResponse = await axios.put(
            `${config.apiUrl}/universidades_origenes/disabled/${id}`
        );
        return apiResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al Deshabilitar institución');
    }
}
