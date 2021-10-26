const BASE_URL = "https://norma.nomoreparties.space/api";
const handleResponse = (response) => {
    if (response.ok) return response.json();
    else return Promise.reject(response.status);
}
export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => handleResponse(res));
}
export const createOrder = (ingredients) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "ingredients": ingredients
        })
    }).then((res) => handleResponse(res));
}