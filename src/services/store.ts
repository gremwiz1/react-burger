import { compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { wsActions } from "./actions/websocket";
import { socketMiddleware } from "./middleware/socket-middleware";
import { rootReducer } from "./reducers";

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(socketMiddleware(wsActions),thunk));
export const store = createStore(rootReducer, enhancer);