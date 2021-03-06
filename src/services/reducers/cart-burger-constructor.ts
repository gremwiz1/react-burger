import { ITypeData } from '../../utils/types';
import { ADDED_ITEM, DELETE_ITEM, DELETE_ITEM_ON_INDEX, CHANGE_ORDER_INGREDIENT_IN_BURGER, CLEAR_CART, TCartBurgerConstructorActions } from '../actions/index';
type TCartInitialStateBurgerConstructor = {
    ingredients: ITypeData[]
}
const cartInitialStateBurgerConstructor : TCartInitialStateBurgerConstructor = {
    ingredients: []
};
export const cartBurgerConstructorReducer = (state = cartInitialStateBurgerConstructor, action : TCartBurgerConstructorActions) : TCartInitialStateBurgerConstructor => {
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
        case CLEAR_CART: {
            return {
                ...state,
                ingredients: []
            }
        }
        default: {
            return state;
        }
    }
}