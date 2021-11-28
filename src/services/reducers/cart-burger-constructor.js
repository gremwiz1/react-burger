import { ADDED_ITEM, DELETE_ITEM, DELETE_ITEM_ON_INDEX, CHANGE_ORDER_INGREDIENT_IN_BURGER } from '../actions/index';
const cartInitialStateBurgerConstructor = {
    ingredients: []
};
export const cartBurgerConstructorReducer = (state = cartInitialStateBurgerConstructor, action) => {
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