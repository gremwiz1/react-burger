import { combineReducers } from 'redux';
import { isDoStatement } from 'typescript';
import {
    GET_ITEMS_ERROR, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, DELETE_ITEM_ON_INDEX, CHANGE_ORDER_INGREDIENT_IN_BURGER,
    DELETE_ITEM, ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, ADD_INGREDIENT, DELETE_INGREDIENT,
    OPEN_MODAL_ORDER, CLOSE_MODAL_ORDER, OPEN_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT, ADDED_ITEM,
    USER_REQUEST, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_FAILED, USER_REQUEST_SUCCESS,
    USER_REQUEST_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, LOGOUT_REQUEST,
    LOGOUT_SUCCESS, LOGOUT_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
    TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILED
} from '../actions/index';

const initialStateItems = {
    items: [],
    isLoading: false,
    itemsError: false
};
const ordersInitialState = {
    orderNumber: 0,
    orderName: "",
    orderRequest: false,
    orderError: false,
    isOpenModalOrder: false
};
const cartInitialStateBurgerConstructor = {
    ingredients: []
};
const ingredientInitialState = {
    ingredient: {},
    isOpenModalIngredient: false
};
const userInitialState = {
    name: "",
    email: "",
    userRequest: false,
    isLoggedIn: false,
    passwordRequest: false,
    isForgotPassword: false,
    resetPasswordRequest: false,
    isResetPassword: true,
    logoutRequest: false,
    logoutFailed: false,
    updateUserRequest: false,
    updateUserSuccess: false,
    tokenRequest: false,
    tokenSuccess: false
};
const cartBurgerConstructorReducer = (state = cartInitialStateBurgerConstructor, action) => {
    switch (action.type) {
        case ADDED_ITEM: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.item]
            };
        }
        case DELETE_ITEM: {
            return { ...state, ingredients: [...state.ingredients].filter(item => item._id !== action.id) };
        }
        case DELETE_ITEM_ON_INDEX: {
            return {
                ...state,
                ingredients: [...state.ingredients].filter((item, index) => index !== action.index)
            }
        }
        case CHANGE_ORDER_INGREDIENT_IN_BURGER: {
            return {
                ...state,
                ingredients: action.ingredients
            }
        }
        default: {
            return state;
        }
    }
}
const itemsReducer = (state = initialStateItems, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                isLoading: false
            }
        }
        case GET_ITEMS_SUCCESS: {
            return {
                ...state,
                isLoading: true,
                itemsError: false,
                items: action.items
            }
        }
        case GET_ITEMS_ERROR: {
            return {
                ...state,
                isLoading: false,
                itemsError: true
            }
        }
        default: {
            return state;
        }
    }
}
const orderReducer = (state = ordersInitialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderError: false,
                orderNumber: action.orders.order.number,
                orderName: action.orders.name
            }
        }
        case ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderError: true
            }
        }
        case OPEN_MODAL_ORDER: {
            return {
                ...state,
                isOpenModalOrder: true
            }
        }
        case CLOSE_MODAL_ORDER: {
            return {
                ...state,
                isOpenModalOrder: false
            }
        }
        default: {
            return state;
        }
    }
};
const ingredientReducer = (state = ingredientInitialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredient: action.item
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                ingredient: {}
            }
        }
        case OPEN_MODAL_INGREDIENT: {
            return {
                ...state,
                isOpenModalIngredient: true
            }
        }
        case CLOSE_MODAL_INGREDIENT: {
            return {
                ...state,
                isOpenModalIngredient: false
            }
        }
        default: {
            return state;
        }
    }
}
const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case USER_REQUEST: {
            return {
                ...state,
                userRequest: true
            }
        }
        case USER_REGISTRATION_SUCCESS: {
            return {
                ...state,
                userRequest: false,
                name: action.user.name,
                email: action.user.email,
                isLoggedIn: true
            }
        }
        case USER_REGISTRATION_FAILED: {
            return {
                ...state,
                userRequest: false,
                isLoggedIn: false,
                email: "",
                name: ""
            }
        }
        case USER_REQUEST_SUCCESS: {
            return {
                ...state,
                userRequest: false,
                name: action.user.name,
                email: action.user.email,
                isLoggedIn: true
            }
        }
        case USER_REQUEST_FAILED: {
            return {
                ...state,
                userRequest: false,
                isLoggedIn: false,
                email: "",
                name: ""
            }
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                passwordRequest: true,
                isResetPassword: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                passwordRequest: false,
                isForgotPassword: true
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                passwordRequest: false
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                isResetPassword: true,
                isForgotPassword: false
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                email: "",
                name: "",
                logoutRequest: false,
                logoutFailed: false,
                isLoggedIn: false
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            }
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserSuccess: false
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: true,
                name: action.user.name,
                email: action.user.email
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: false
            }
        }
        case TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
                tokenSuccess: false
            }
        }
        case TOKEN_SUCCESS: {
            return {
                ...state,
                tokenRequest: false,
                tokenSuccess: true
            }
        }
        case TOKEN_FAILED: {
            return {
                ...state,
                tokenRequest: false,
                tokenSuccess: false
            }
        }
        default: {
            return state;
        }
    }
}
export const rootReducer = combineReducers({
    items: itemsReducer,
    cart: cartBurgerConstructorReducer,
    order: orderReducer,
    ingredient: ingredientReducer,
    user: userReducer
});