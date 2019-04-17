import produce from 'immer';
import {
  PlayerState,
  PlayerActionTypes,
  PLAYER_MOVED
} from './types';

import {
  SOCKET_EVENT,
  SocketActionTypes
} from '../middleware/socketio/types';

const initialState: PlayerState = {
  canMove: false,
  id: '',
  username: '',
  currentScore: 0,
  row: 9,
  column: 0,
  visitedCells: [],
  visitedCellsStr: []
}

export default function(state = initialState, action: PlayerActionTypes | SocketActionTypes) {
  switch (action.type) {
    case PLAYER_MOVED:
      return produce(state, draft => {
        const {row, column} = action.payload;
        draft.row = row;
        draft.column = column;
        draft.visitedCells.push([row, column]);
        draft.visitedCellsStr.push(`${row}-${column}`);
      });
    case SOCKET_EVENT:
      switch (action.event) {
        case 'init-connection':
          // return produce(state, draft => {
          //   draft.canMove = false;
          // });
        case 'state-change':
          return produce(state, draft => {
            const {currentState, grid} = action.payload

            draft.visitedCells = [[9, 0]];
            draft.visitedCellsStr = ['9-0'];

            if (currentState === 'playing') {
              draft.canMove = true;
            } else {
              draft.canMove = false;
            }
            // const {opponents} = action.payload;
            // draft.ids = opponents.ids;
            // draft.byId = opponents.byId;
          });
        default:
          break;
      }
    default:
      return state;
  }
}
