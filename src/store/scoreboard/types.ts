export interface Opponent {
  id: string;
  currentScore: number;
  username: string;
}

export interface ScoreboardState {
  ids: string[];
  byId: {[id: string]: Opponent};
}

export const SCOREBOARD_UPDATE = 'SCOREBOARD_UPDATE';

interface ScoreboardUpdateAction {
  type: typeof SCOREBOARD_UPDATE;
  payload: {
    ids: string[],
    byId: {[id: string]: Opponent}
  }
}

export type ScoreboardActionTypes = ScoreboardUpdateAction ;

