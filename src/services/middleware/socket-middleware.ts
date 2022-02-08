import type { Middleware, MiddlewareAPI } from 'redux';
import type { TAppActions, AppDispatch, RootState } from '../../utils/types';
import { IWsConnectionStart, TWSSocketActions } from '../actions/websocket';


export const socketMiddleware = (wsActions: TWSSocketActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit('someUrl').type) {
        const { payload } = action as IWsConnectionStart
        socket = new WebSocket(payload.url)
      }
      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch(onOpen);
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch(onError)
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData
          dispatch(onMessage(restParsedData))
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch(onClose);
        };

      }

      next(action);
    };
  }) as Middleware;
};