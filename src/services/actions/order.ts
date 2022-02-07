import { Dispatch } from 'react';
import * as IngredientApi from '../../utils/IngredientApi';
export const ORDER_REQUEST : 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS : 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_ERROR : 'ORDER_ERROR' = 'ORDER_ERROR';

interface IOrders {
    name?: string,
    success: boolean,
    order?: {
        number: number
    }
}
interface IOrderRequestAction {
    readonly type: typeof ORDER_REQUEST;
}
interface IOrderSuccessAction {
    readonly type: typeof ORDER_SUCCESS;
    readonly orders: IOrders;
}
interface IOrderErrorAction {
    readonly type: typeof ORDER_ERROR;
}
export type TOrdersActions = 
| IOrderRequestAction 
| IOrderSuccessAction 
| IOrderErrorAction;
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