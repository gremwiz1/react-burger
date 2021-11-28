import Profile from '../../pages/profile/profile';
import * as IngredientApi from '../../utils/IngredientApi';
import { setTokens, signOut } from '../../utils/utils';
export const DELETE_ITEM = 'DELETE_ITEM';
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const OPEN_MODAL_ORDER = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER';
export const OPEN_MODAL_INGREDIENT = 'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT = 'CLOSE_MODAL_INGREDIENT';
export const ADDED_ITEM = 'ADDED_ITEM';
export const DELETE_ITEM_ON_INDEX = 'DELETE_ITEM_ON_INDEX';
export const CHANGE_ORDER_INGREDIENT_IN_BURGER = 'CHANGE_ORDER_INGREDIENT_IN_BURGER';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS';
export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';
export function getItems() {
    return function (dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });
        IngredientApi.getIngredients()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ITEMS_SUCCESS,
                        items: res.data
                    });
                } else {
                    dispatch({
                        type: GET_ITEMS_ERROR
                    });
                }
            }).catch((err) => {
                dispatch({
                    type: GET_ITEMS_ERROR
                });
            })
    };
}
export function gerOrder(idIngredients) {
    return function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        });
        IngredientApi.createOrder(idIngredients)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: ORDER_SUCCESS,
                        orders: res
                    });
                    dispatch({
                        type: OPEN_MODAL_ORDER
                    });
                } else {
                    dispatch({
                        type: ORDER_ERROR
                    });
                }
            }).catch((err) => {
                dispatch({
                    type: ORDER_ERROR
                });
            })
    };
}
export function registration(data) {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        IngredientApi.registrationUser(data)
            .then(res => {
                if (res && res.success) {
                    setTokens(res);
                    dispatch({
                        type: USER_REGISTRATION_SUCCESS,
                        user: res.user
                    })
                }
                else {
                    dispatch({
                        type: USER_REGISTRATION_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: USER_REGISTRATION_FAILED
                })
            })
    }
}
export function authorization(data) {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        IngredientApi.autorizationUser(data)
            .then(res => {
                if (res && res.success) {
                    setTokens(res);
                    dispatch({
                        type: USER_REQUEST_SUCCESS,
                        user: res.user
                    })
                }
                else {
                    dispatch({
                        type: USER_REQUEST_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: USER_REQUEST_FAILED
                })
            })
    }
}
export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        IngredientApi.forgotPasswordUser(email)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    })
                }
                else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            })
    }
}
export function resetPassword(data) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        IngredientApi.resetPasswordUser(data)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    })
                }
                else {
                    dispatch({
                        type: RESET_PASSWORD_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            })
    }
}
export function logout(callback) {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        IngredientApi.logoutUser()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGOUT_SUCCESS
                    });
                    signOut();
                    callback();
                }
                else {
                    dispatch({
                        type: LOGOUT_FAILED
                    });
                }
            }).catch((err) => {
                dispatch({
                    type: LOGOUT_FAILED
                })
            })
    }
}
export function getNewToken() {
    return function (dispatch) {
        dispatch({
            type: TOKEN_REQUEST
        });
        IngredientApi.refreshToken()
            .then((res) => {
                if (res && res.success) {
                    setTokens(res);
                    dispatch({
                        type: TOKEN_SUCCESS
                    });
                }
                else {
                    dispatch({
                        type: TOKEN_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: TOKEN_FAILED
                })
            })
    }
}
export function changeUserProfile(data) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        IngredientApi.updateUser(data)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS, res
                    })
                }
                else {
                    dispatch({
                        type: UPDATE_USER_FAILED
                    })
                }
            }).catch((err) => {
                if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
                    dispatch(getNewToken());
                    dispatch(changeUserProfile(data));
                }
                else {
                    dispatch({
                        type: UPDATE_USER_FAILED
                    })
                }
            })
    }
}
export function getUser() {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        IngredientApi.getUser()
            .then(res => {
                if (res && res.success) {
                    setTokens(res);
                    dispatch({
                        type: USER_REQUEST_SUCCESS,
                        user: res.user
                    })
                }
                else {
                    dispatch({
                        type: USER_REQUEST_FAILED
                    })
                }
            }).catch((err) => {
                if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
                    dispatch(getNewToken());
                    dispatch(getUser());
                }
                else {
                    dispatch({
                        type: USER_REQUEST_FAILED
                    })
                }
            })
    }
}