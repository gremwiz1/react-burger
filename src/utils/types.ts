import { TCartBurgerConstructorActions, TItemsActions, TOrdersActions, TUserActions } from "../services/actions";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { store } from "..";
import { TWSActions } from "../services/actions/websocket";

export interface ITypeData {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    quantity: number | undefined
}
export interface ITypeOrder {
    "_id": string,
    "ingredients": Array<string>,
    "status": string,
    "name": string,
    "createdAt": string,
    "updatedAt": string,
    "number": number
}
export type TAppActions =
    | TCartBurgerConstructorActions
    | TItemsActions
    | TOrdersActions
    | TUserActions
    | TWSActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type AppDispatch = Dispatch<TAppActions>;

interface IOrders {
    "_id": string,
    "ingredients": string[],
    "status": string,
    "name": string,
    "createdAt": string,
    "updatedAt": string,
    "number": number
}
export interface IOrdersFromSocket {
    "success": boolean,
    "orders": IOrders[],
    "total": number,
    "totalToday": number
}
