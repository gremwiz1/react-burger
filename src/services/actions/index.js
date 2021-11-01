import * as IngredientApi from '../../utils/IngredientApi';
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