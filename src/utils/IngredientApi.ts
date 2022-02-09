import { getCookie } from "./utils";

const BASE_URL = "https://norma.nomoreparties.space/api";
const handleResponse = (response: Response) => {
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
export const createOrder = (ingredients: string[]) => {
    return fetch(`${BASE_URL}/orders`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`,
          },
        method: 'POST',
        body: JSON.stringify({
            "ingredients": ingredients
        })
    }).then((res) => handleResponse(res));
}
interface IRegistrationUser {
    email: string,
    password: string,
    name: string
}
export const registrationUser= ({ email, password, name }: IRegistrationUser) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password, name
        })
    }).then((res) => handleResponse(res));
}
interface IAutorizationUser {
    password: string,
    email: string
}
export const autorizationUser = ({ password, email }: IAutorizationUser) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password, email
        })
    }).then((res) => handleResponse(res));
}
interface IForgotPasswordUser {
    email: string
}
export const forgotPasswordUser = ({ email }: IForgotPasswordUser) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email
        })
    }).then((res) => handleResponse(res));
}
interface IResetPasswordUser {
    password: string,
    token: string
}
export const resetPasswordUser = ({ password, token }: IResetPasswordUser) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password, token
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
interface IUpdateUser {
    email: string,
    password: string,
    name: string
}
export const updateUser = ({ email, password, name }: IUpdateUser) => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify({
            email, password, name
        })
    }).then((res) => handleResponse(res));
}