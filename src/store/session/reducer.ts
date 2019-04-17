import produce from 'immer';
import {
  Maze,
  SessionState
} from './types';

import {
  SOCKET_EVENT,
  SocketActionTypes
} from '../middleware/socketio/types';

function createGrid(num: number): Maze {
  return Array(num).fill(0).map(()=>Array(num).fill(0));
}

const initialState: SessionState = {
  grid: {
    rows: 10,
    columns: 10,
    maze: createGrid(10),
  },
  currentState: 'waiting'
}

export default function(state = initialState, action: SocketActionTypes) {
  switch (action.type) {

    case SOCKET_EVENT:
      switch (action.event) {
        case 'init-connection':
          return produce(state, draft => {
            draft.currentState = action.payload.currentState;
          });

        case 'state-change':
          return produce(state, draft => {
            const {currentState, grid} = action.payload
            if (currentState === 'playing') {
              draft.grid = {
                columns: grid.columns,
                rows: grid.rows,
                maze: grid.maze
              }
            }
            draft.currentState = currentState;
          });
        default:
          break;
      }
    default:
      return state;
  }
}
