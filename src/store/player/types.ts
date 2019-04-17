export interface Player {
  id: string;
  currentScore: number;
  username: string;
  canMove: boolean;
  row: number;
  column: number;
  visitedCells: number[][];
  visitedCellsStr: string[];
}

export interface PlayerState extends Player {}

export const PLAYER_SCORED = 'PLAYER_SCORED';
export const PLAYER_MOVED = 'PLAYER_MOVED';

interface PlayerScoredAction {
  type: typeof PLAYER_SCORED;
}

interface PlayerMovedAction {
  type: typeof PLAYER_MOVED;
  payload: {
    row: number,
    column: number
  }
}

export type PlayerActionTypes = PlayerScoredAction | PlayerMovedAction;
