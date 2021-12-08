import { Dispatch } from 'react';
import * as IngredientApi from '../../utils/IngredientApi';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export function gerOrder(idIngredients: string[]) {
    return function (dispatch: Dispatch<any>) {
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