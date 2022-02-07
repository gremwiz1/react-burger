import { ITypeData } from "../../utils/types";

export const DELETE_ITEM : 'DELETE_ITEM'  = 'DELETE_ITEM';
export const ADDED_ITEM : 'ADDED_ITEM' = 'ADDED_ITEM';
export const DELETE_ITEM_ON_INDEX : 'DELETE_ITEM_ON_INDEX' = 'DELETE_ITEM_ON_INDEX';
export const CHANGE_ORDER_INGREDIENT_IN_BURGER : 'CHANGE_ORDER_INGREDIENT_IN_BURGER' = 'CHANGE_ORDER_INGREDIENT_IN_BURGER';
export const CLEAR_CART : 'CLEAR_CART' = 'CLEAR_CART';

interface IDeleteItemAction {
    readonly type: typeof DELETE_ITEM;
    readonly id: string;
}
interface IAddedItemAction {
    readonly type: typeof ADDED_ITEM;
    readonly item: ITypeData;
}
interface IDeleteItemOnIndexAction {
    readonly type: typeof DELETE_ITEM_ON_INDEX;
    readonly index: number;
}
interface IChangeOrderIngredientInBurgerAction {
    readonly type: typeof CHANGE_ORDER_INGREDIENT_IN_BURGER;
    readonly ingredients: ITypeData[];
}
interface IClearCartAction {
    readonly type: typeof CLEAR_CART;
}
export type TCartBurgerConstructorActions = 
| IDeleteItemAction 
| IAddedItemAction 
| IDeleteItemOnIndexAction 
| IChangeOrderIngredientInBurgerAction 
| IClearCartAction;