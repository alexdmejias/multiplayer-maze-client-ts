import { combineReducers, createStore, applyMiddleware } from 'redux';
import scoreboardReducer from './scoreboard/reducer';
import uiReducer from './ui/reducer';
import sessionReducer from './session/reducer';
import playerReducer from './player/reducer';

import SoundsMiddleware from './middleware/sounds';
import HotKeysMiddleware from './middleware/hotkeys';
import socketIOMiddleware from './middleware/socketio';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

const logger = createLogger({
  collapsed: true
})

const rootReducer = combineReducers({
  scoreboard: scoreboardReducer,
  ui: uiReducer,
  session: sessionReducer,
  player: playerReducer
});

export type AppStoreState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [logger, socketIOMiddleware, HotKeysMiddleware, SoundsMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middlewareEnhancer)
  )

  return store;
}
