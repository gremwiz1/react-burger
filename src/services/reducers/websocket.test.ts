import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/websocket';
import type { TWSActions } from '../actions/websocket';
import { IOrdersFromSocket } from '../../utils/types';
import { wsReducer } from './websocket';

type TWSState = {
  wsConnected: boolean;
  messages: IOrdersFromSocket;
  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  messages: {
    "success": false,
    "orders": [],
    "total": 0,
    "totalToday": 0
  }
};
describe('wsReducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {} as TWSActions)).toEqual(initialState);
  });
  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_SUCCESS
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        error: undefined,
        wsConnected: true
      })
    );
  });
  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_ERROR
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        wsConnected: false
      })
    );
  });
  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_CLOSED
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        error: undefined,
        wsConnected: false
      })
    );
  });
  it('should handle WS_GET_MESSAGE', () => {
    expect(
      wsReducer(initialState, {
        type: WS_GET_MESSAGE, payload: {
          "success": true,
          "orders": [{
            "_id": "223",
            "ingredients": ["111", "222"],
            "status": 'done',
            "name": "testName",
            "createdAt": "Create",
            "updatedAt": "Update",
            "number": 22
          }],
          "total": 111,
          "totalToday": 111
        }
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        error: undefined,
        messages: {
          "success": true,
          "orders": [{
            "_id": "223",
            "ingredients": ["111", "222"],
            "status": 'done',
            "name": "testName",
            "createdAt": "Create",
            "updatedAt": "Update",
            "number": 22
          }],
          "total": 111,
          "totalToday": 111
        }
      })
    );
  });
});