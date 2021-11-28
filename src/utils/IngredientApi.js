import { getCookie } from "./utils";

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
export const registrationUser = (data) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data
        })
    }).then((res) => handleResponse(res));
}
export const autorizationUser = (data) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data
        })
    }).then((res) => handleResponse(res));
}
export const forgotPasswordUser = (data) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data
        })
    }).then((res) => handleResponse(res));
}
export const resetPasswordUser = (data) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data
        })
    }).then((res) => handleResponse(res));
}
export const logoutUser = () => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.refreshToken
        })
    }).then((res) => handleResponse(res));
}
export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.refreshToken
        })
    }).then((res) => handleResponse(res));
}
export const getUser = () => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('token')}`,
        }
    }).then((res) => handleResponse(res));
}
export const updateUser = (data) => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify({
            data
        })
    }).then((res) => handleResponse(res));
}