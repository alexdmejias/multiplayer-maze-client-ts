import {Opponent, SCOREBOARD_UPDATE} from './types';

export function updateScoreboard(payload: {[id: string]: Opponent}) {
  return {
    type: SCOREBOARD_UPDATE,
    payload
  }
}
