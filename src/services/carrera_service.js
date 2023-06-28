import axios from 'axios';
import { config } from '../config/config';

export async function getCarreras() {
    const apiResponse = await axios.get(`${config.apiUrl}/carreras`);
    return apiResponse.data;
}

export async function getCarrera(id) {
    const apiResponse = await axios.get(`${config.apiUrl}/carreras/${id}`);
    return apiResponse.data;
}

export async function createCarrera(carrera) {
    const apiResponse = await axios.post(`${config.apiUrl}/carreras`, carrera, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return apiResponse.data;
}

export async function updateCarrera(carrera) {
    const apiResponse = await axios.put(`${config.apiUrl}/carreras`, carrera, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return apiResponse.data;
}

export async function deleteCarrera(carrera) {
    const apiResponse = await axios.delete(
        `${config.apiUrl}/carreras/` + carrera.id
    );
    return apiResponse.data;
}
