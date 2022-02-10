import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, TOrdersActions } from '../actions/index';
import { orderReducer } from './order';
type TOrdersInitialState = {
  orderNumber: number,
  orderName: string,
  orderRequest: boolean,
  orderError: boolean
}
const ordersInitialState: TOrdersInitialState = {
  orderNumber: 0,
  orderName: "",
  orderRequest: false,
  orderError: false
};
describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {} as TOrdersActions)).toEqual(ordersInitialState);
  });
  it('should handle ORDER_REQUEST', () => {
    expect(
      orderReducer(ordersInitialState, {
        type: ORDER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...ordersInitialState,
        orderRequest: true,
        orderError: false
      })
    );
  });
  it('should handle ORDER_SUCCESS', () => {
    expect(
      orderReducer(ordersInitialState, {
        type: ORDER_SUCCESS, orders: { order: { number: 3 }, name: "testName", success: true }
      })
    ).toEqual(
      expect.objectContaining({
        ...ordersInitialState,
        orderRequest: false,
        orderError: false,
        orderNumber: 3,
        orderName: "testName"
      })
    );
  });
  it('should handle ORDER_ERROR', () => {
    expect(
      orderReducer(ordersInitialState, {
        type: ORDER_ERROR
      })
    ).toEqual(
      expect.objectContaining({
        ...ordersInitialState,
        orderRequest: false,
        orderError: true
      })
    );
  });
});