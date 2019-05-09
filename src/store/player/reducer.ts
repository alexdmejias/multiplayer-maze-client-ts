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
        case 'init-connection':
          return produce(state, draft => {
            const { player } = action.payload;
            draft.id = player.id;
            draft.currentScore = player.currentScore;
            draft.username = player.username;
          })
        case 'state-change':
          return produce(state, draft => {
            const {currentState, grid} = action.payload

            if (currentState === 'playing') {
              draft.row = grid.starting[0];
              draft.column = grid.starting[1];
              draft.visitedCells = [grid.starting];
              draft.visitedCellsStr = [grid.starting.toString()];
              draft.scored = false;
              draft.canMove = true;
            } else {
              draft.canMove = false;
            }
          });
        case 'player-scored':
          return produce(state, draft => {
            const {currentScore} = action.payload.player;
            draft.currentScore = currentScore;
          })
        default:
          break;
      }
    default:
      return state;
  }
}
