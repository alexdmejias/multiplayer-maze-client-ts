import { combineReducers, createStore, applyMiddleware } from 'redux';
import scoreboardReducer from './scoreboard/reducer';
import uiReducer from './ui/reducer';
import sessionReducer from './session/reducer';
import playerReducer from './player/reducer';

import socketIOMiddleware from './middleware/socketio';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  scoreboard: scoreboardReducer,
  ui: uiReducer,
  session: sessionReducer,
  player: playerReducer
});

export type AppStoreState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [logger, socketIOMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middlewareEnhancer)
  )

  return store;
}
