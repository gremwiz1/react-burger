import { TCartBurgerConstructorActions, TItemsActions, TOrdersActions, TUserActions } from "../services/actions";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TWSActions } from "../services/actions/websocket";
import { store } from "../services/store";

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
export interface IOrdersFromSocket {
    "success": boolean,
    "orders": ITypeOrder[],
    "total": number,
    "totalToday": number
}
