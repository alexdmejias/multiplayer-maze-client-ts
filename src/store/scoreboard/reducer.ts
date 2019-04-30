import produce from 'immer';
import {
  ScoreboardState,
  ScoreboardActionTypes
} from './types';

import {
  SOCKET_EVENT,
  SocketActionTypes
} from '../middleware/socketio/types';

const initialState: ScoreboardState = {
  byId: {},
  ids: []
}

export default function(state = initialState, action: ScoreboardActionTypes | SocketActionTypes) {
  switch (action.type) {
    case SOCKET_EVENT:
      switch (action.event) {
        case 'init-connection':
          return produce(state, draft => {
            const {opponents} = action.payload;
            draft.ids = opponents.ids;
            draft.byId = opponents.byId;
          });

        case 'state-change':
          return produce(state, draft => {
            const {opponents} = action.payload;
            draft.ids = opponents.ids;
            draft.byId = opponents.byId;
          });
        default:
          break;
      }
    default:
      return state;
  }
}
