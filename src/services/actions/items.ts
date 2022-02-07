import { Dispatch } from 'react';
import * as IngredientApi from '../../utils/IngredientApi';
export const GET_ITEMS_REQUEST : 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS : 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR : 'GET_ITEMS_ERROR' = 'GET_ITEMS_ERROR';

interface IGetItemsRequestAction {
    readonly type: typeof GET_ITEMS_REQUEST;
}
interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
}
interface IGetItemsErrorAction {
    readonly type: typeof GET_ITEMS_ERROR;
}
export type TItemsAction = 
| IGetItemsRequestAction 
| IGetItemsSuccessAction 
| IGetItemsErrorAction;
export function getItems() {
    return function (dispatch: Dispatch<any>) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });
        IngredientApi.getIngredients()
            .then(res => {
                if (res && res.success) {
                    localStorage.setItem('burgerIngredients', JSON.stringify(res.data));
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
