// Constantes Back
const SERVICES_CONFIG = {
    baseUrl: 'http://localhost',
    port: ':3001',
    path: '/api/archivos'
};

//call
export async function postArchivos(body) {
    const endpoint = `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.port}${SERVICES_CONFIG.path}`;
    const response = await fetch(endpoint, {
        method: 'POST',
        body: body
    });
    return response;
}

export async function getArchivos(nombreArchivo) {
    const endpoint = `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.port}${SERVICES_CONFIG.path}/${nombreArchivo}`;
    const response = await fetch(endpoint, {
        method: 'GET'
    });
    return response;
}

export function getLinkArchivos(nombreArchivo) {
    return `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.port}${SERVICES_CONFIG.path}/${nombreArchivo}`;
}

export async function deleteArchivos(nombreArchivo) {
    const endpoint = `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.port}${SERVICES_CONFIG.path}/${nombreArchivo}`;
    const response = await fetch(endpoint, {
        method: 'DELETE'
    });
    return response;
}
