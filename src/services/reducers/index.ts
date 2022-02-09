import { combineReducers } from 'redux';
import { cartBurgerConstructorReducer } from './cart-burger-constructor';
import { itemsReducer } from './items';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './websocket';

export const rootReducer = combineReducers({
    items: itemsReducer,
    cart: cartBurgerConstructorReducer,
    order: orderReducer,
    user: userReducer,
    socket: wsReducer
});