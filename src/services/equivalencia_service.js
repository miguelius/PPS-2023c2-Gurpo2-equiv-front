import axios from 'axios';
import { config } from '../config/config';

export async function getEquivalencia() {
    const apiResponse = await axios.get(
        `${config.apiUrl}/equivalencias/general`
    );
    return apiResponse.data;
}

export async function getEquivalenciaUsuario(id) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/equivalencias/generalUsuario/${id}`
    );
    return apiResponse.data;
}
