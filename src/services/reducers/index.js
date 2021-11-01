import { combineReducers } from 'redux';
import {
    GET_ITEMS_ERROR, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, DELETE_ITEM_ON_INDEX,
    DELETE_ITEM, ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, ADD_INGREDIENT, DELETE_INGREDIENT,
    OPEN_MODAL_ORDER, CLOSE_MODAL_ORDER, OPEN_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT, ADDED_ITEM
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
export const rootReducer = combineReducers({
    items: itemsReducer,
    cart: cartBurgerConstructorReducer,
    order: orderReducer,
    ingredient: ingredientReducer
});