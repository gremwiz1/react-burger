import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR } from '../actions/index';
const ordersInitialState = {
    orderNumber: 0,
    orderName: "",
    orderRequest: false,
    orderError: false
};
export const orderReducer = (state = ordersInitialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderError: false,
                orderNumber: action.orders.order.number,
                orderName: action.orders.name
            }
        }
        case ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderError: true
            }
        }
        default: {
            return state;
        }
    }
};