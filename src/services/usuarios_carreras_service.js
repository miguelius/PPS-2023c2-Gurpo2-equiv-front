import axios from 'axios';
import { config } from '../config/config';

export async function createUsuario_Carrera(usuario_carrera) {
    const apiResponse = await axios.post(
        `${config.apiUrl}/usuarios_carreras`,
        usuario_carrera,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return apiResponse.data;
}
