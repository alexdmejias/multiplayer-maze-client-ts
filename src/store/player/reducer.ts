import produce from 'immer';
import {
  PlayerState,
  PlayerActionTypes,
  PLAYER_MOVED,
  PLAYER_SCORED
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
  visitedCellsStr: [],
  scored: false
}

export default function(state = initialState, action: PlayerActionTypes | SocketActionTypes) {
  switch (action.type) {
    case PLAYER_SCORED:
      return produce(state, draft => {
        draft.canMove = false;
        draft.scored = true;
      });
    case PLAYER_MOVED:
      return produce(state, draft => {
        const {row, column} = action.payload;
        draft.row = row;
        draft.column = column;
        draft.visitedCells.push([row, column]);
        draft.visitedCellsStr.push(`${row},${column}`);
      });
    case SOCKET_EVENT:
      switch (action.event) {
        // return produce(state, draft => {
          //   draft.canMove = false;
          // });
        case 'init-connection':
        case 'state-change':
          return produce(state, draft => {
            const {currentState, grid} = action.payload

            draft.visitedCells = [grid.starting];
            draft.visitedCellsStr = [grid.starting.toString()];
            draft.row = grid.starting[0];
            draft.column = grid.starting[1];

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
