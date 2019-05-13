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
    starting: [0, 9],
    ending: [9, 0]
  },
  currentState: 'waiting',
  duration: 0
}

export default function(state = initialState, action: SocketActionTypes) {
  switch (action.type) {

    case SOCKET_EVENT:
      switch (action.event) {
        case 'init-connection':
          return produce(state, draft => {
            draft.currentState = action.payload.currentState;
            const {currentState, grid} = action.payload
            draft.currentState = 'first';
            if (currentState === 'playing') {
              draft.grid = { ...grid };
            }
          });

        case 'state-change':
          return produce(state, draft => {
            const {currentState, grid, duration} = action.payload
            draft.duration = duration;
            if (currentState === 'playing') {
              draft.grid = { ...grid}
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
