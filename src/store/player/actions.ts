import { PLAYER_SCORED, PLAYER_MOVED } from './types';

export function playerScored() {
  return {
    type: PLAYER_SCORED,
    socketEvent: 'player:scored'
  }
}

export function playerMoved(row: number, column: number) {
  return {
    type: PLAYER_MOVED,
    payload: {
      row,
      column
    }
  }
}
