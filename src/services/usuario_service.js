import axios from 'axios';
import { config } from '../config/config';

export async function getUsuario(id) {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/${id}`);
    return apiResponse.data;
}

export async function getUsuarios() {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/todos`);
    return apiResponse.data;
}

export async function getDirectivos() {
    const apiResponse = await axios.get(
        `${config.apiUrl}/usuarios/directivos/todos`
    );
    return apiResponse.data;
}
