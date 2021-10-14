const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";
const handleResponse = (response) => {
    if (response.ok) return response.json();
    else return Promise.reject(response.status);
}
export const getIngredients = (token) => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => handleResponse(res));
}