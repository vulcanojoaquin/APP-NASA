const BASE_URL = 'https://69eb6fd597482ad5c527b5ee.mockapi.io/api/planetas/APOD'

// Le agregamos el parámetro searchQuery por defecto vacío
export const getAllApod = async (page = 1, limit = 10, searchQuery = '') => { // si no se pasa valor por parametro, se usa por default 1 al 10
    // Si hay un texto de búsqueda, le agregamos ?search= a la URL
    const url = searchQuery
        ? `${BASE_URL}?search=${searchQuery}`
        : `${BASE_URL}?page=${page}&limit=${limit}`;

    const response = await fetch(url);
    
    // SOLUCIÓN AL BUG: Si MockAPI no encuentra nada, devuelve un error 404.
    // Si no atajamos esto, intenta hacer un map sobre un string "Not found" y se rompe.
    // Si no hay respuesta OK, devolvemos un array vacío para que React no falle.
    if (!response.ok) {
        return [];
    }
    
    return response.json();
};

export const getApodById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
}