import axios from 'axios';
import { config } from '../config/config';

export async function getMensajes(id_equivalencia) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/mensajes/${id_equivalencia}`
    );
    return apiResponse;
}

export async function enviarMensaje(mensaje) {
    const apiResponse = await axios.post(
        `${config.apiUrl}/mensajes/`,
        mensaje,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return apiResponse;
}

export async function updateMensaje(mensaje) {
    const apiResponse = await axios.put(`${config.apiUrl}/mensajes/`, mensaje, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return apiResponse;
}

export async function deleteMensaje(id_mensaje) {
    const apiResponse = await axios.delete(
        `${config.apiUrl}/mensajes/${id_mensaje}`
    );
    return apiResponse;
}
