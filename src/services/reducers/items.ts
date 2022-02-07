import { ITypeData } from '../../utils/types';
import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR, TItemsActions } from '../actions/index';
type TInitialStateItems = {
    items: ITypeData[],
    isLoading: boolean,
    itemsError: boolean
}
const initialStateItems : TInitialStateItems = {
    items: [],
    isLoading: false,
    itemsError: false
};
export const itemsReducer = (state = initialStateItems, action : TItemsActions) : TInitialStateItems => {
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