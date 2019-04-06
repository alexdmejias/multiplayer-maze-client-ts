export interface Player {
  id: string;
  currentScore: number;
  username: string;
}

export interface PlayerState {
  id: string;
  currentScore: number;
  username: string;
}

export const PLAYER_SCORED = 'PLAYER_SCORED';

interface PlayerScoredAction {
  type: typeof PLAYER_SCORED;
}

export type PlayerActionTypes = PlayerScoredAction;