import axios from 'axios';
import { config } from '../config/config';
import qs from 'qs';

export async function getUsuario(id) {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/${id}`);
    return apiResponse.data;
}

export async function getUsuarios() {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/todos`);
    return apiResponse.data;
}

// export async function postUsuarios(dni, nombre, apellido, email, discord, telefono, rol, password) {
//     const data = {
//       dni: dni,
//       nombre: nombre,
//       apellido: apellido,
//       email: email,
//       discord: discord,
//       telefono: telefono,
//       rol: rol,
//       password: password
//     };
//     try {
//       const apiResponse = await axios.post(`${config.apiUrl}/usuarios`, data);
//       return apiResponse.data;
//     } catch (error) {
//       console.log(error);
//       throw new Error('Error al hacer la petición post');
//     }
//   }

export async function postUsuarios(
    dni,
    nombre,
    apellido,
    email,
    discord,
    telefono,
    rol,
    password
) {
    const data = {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        email: email,
        discord: discord,
        telefono: telefono,
        rol: rol,
        password: password
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
