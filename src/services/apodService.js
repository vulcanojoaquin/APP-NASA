const BASE_URL = 'https://69eb6fd597482ad5c527b5ee.mockapi.io/api/planetas/APOD'

// Le agregamos el parámetro searchQuery por defecto vacío
export const getAllApod = async (searchQuery = '') => {
    // Si hay un texto de búsqueda, le agregamos ?search= a la URL
    const url = searchQuery
        ? `${BASE_URL}?search=${searchQuery}`
        : BASE_URL;

    const response = await fetch(url);
    return response.json();
};

export const getApodById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
}