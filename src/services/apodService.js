
const BASE_URL = 'https://69eb6fd597482ad5c527b5ee.mockapi.io/api/planetas/APOD'

export const getAllApod = async () => {

    const response = await fetch(BASE_URL);
    return response.json();
};

export const getApodById= async (id) => {

    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json()
}