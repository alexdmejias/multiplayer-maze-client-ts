export type Maze = string[][];

export interface SessionState {
  grid: {
    rows: number,
    columns: number,
    maze: Maze
  },
  currentState: 'waiting' | 'playing';
}
