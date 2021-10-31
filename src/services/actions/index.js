import * as IngredientApi from '../../utils/IngredientApi';
export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

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