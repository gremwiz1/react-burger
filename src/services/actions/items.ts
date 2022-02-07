import * as IngredientApi from '../../utils/IngredientApi';
import { AppDispatch, AppThunk, ITypeData } from '../../utils/types';
export const GET_ITEMS_REQUEST : 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS : 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR : 'GET_ITEMS_ERROR' = 'GET_ITEMS_ERROR';

interface IGetItemsRequestAction {
    readonly type: typeof GET_ITEMS_REQUEST;
}
interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly items: ITypeData[];
}
interface IGetItemsErrorAction {
    readonly type: typeof GET_ITEMS_ERROR;
}
export type TItemsActions = 
| IGetItemsRequestAction 
| IGetItemsSuccessAction 
| IGetItemsErrorAction;
export const getItems : AppThunk = () => {
    return function (dispatch: AppDispatch) {
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
