import { config } from '../config/config';

// Constantes Back
const SERVICES_CONFIG = {
    baseUrl: config.apiUrl,
    path: '/api/archivos',
    url: () => `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.path}`
};

//call
export async function postArchivos(body) {
    const endpoint = SERVICES_CONFIG.url();
    const response = await fetch(endpoint, {
        method: 'POST',
        body: body
    });
    return response;
}

export async function getArchivos(nombreArchivo) {
    const endpoint = `${SERVICES_CONFIG.url()}/${nombreArchivo}`;
    const response = await fetch(endpoint, {
        method: 'GET'
    });
    return response;
}

export function getLinkArchivos(nombreArchivo) {
    return `${SERVICES_CONFIG.url()}/${nombreArchivo}`;
}

export async function deleteArchivos(nombreArchivo) {
    const endpoint = `${SERVICES_CONFIG.url()}/${nombreArchivo}`;
    const response = await fetch(endpoint, {
        method: 'DELETE'
    });
    return response;
}
