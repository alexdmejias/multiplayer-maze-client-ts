export type Maze = string[][];

export interface SessionState {
  grid: {
    rows: number,
    columns: number,
    maze: Maze,
    starting: [number, number],
    ending: [number, number]
  },
  currentState: 'waiting' | 'playing' | 'first',
  duration: number
}
