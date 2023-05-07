import axios from 'axios';
import { config } from '../config/config';
import qs from 'qs';

//revisar en estos dos casos si esta bien q sea apiResponse.data
export async function getInsitutciones() {
    const apiResponse = await axios.get(`${config.apiUrl}/todas`);
    return apiResponse.data;
}

export async function getInsitutcionesHabilitadas() {
    const apiResponse = await axios.get(`${config.apiUrl}/enabled`);
    return apiResponse.data;
}

export async function getInstitucion(id) {
    const apiResponse = await axios.get(`${config.apiUrl}/${id}`);
    return apiResponse.data;
}
//revisar q funcionen bien
export async function postInstituciones(nombre, direccion, sigla) {
    const data = {
        nombre_universidad: nombre,
        localidad: direccion,
        sigla: sigla,
        disabled: false
    };

    try {
        const apiResponse = await axios.post(
            `${config.apiUrl}/usuarios`,
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
