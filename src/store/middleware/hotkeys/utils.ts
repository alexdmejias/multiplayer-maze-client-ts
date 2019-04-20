import {Maze} from '../../session/types';

type DIRECTIONS = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export function getCellType(grid: Maze, row: number, column: number): number {
  return (grid[row] && grid[row][column]) || -1;
}

export function getNeighborPosition(direction: DIRECTIONS, row: number, column: number): [number, number] {
  if (direction === 'NORTH') { return [row - 1, column]; }
  else if (direction === 'EAST') { return [row, column + 1]; }
  else if (direction === 'SOUTH') { return [row + 1, column]; }
  else { return [row, column - 1]; }
}

export function neighborExists(direction: DIRECTIONS, grid: Maze, row: number, column: number): number {
  const [newRow, newColumn] = getNeighborPosition(direction, row, column);

  if (grid[newRow] && grid[newRow][newColumn]) {
    return grid[newRow][newColumn];
  } else {
    return -1;
  }
}

export function isMovementAllowedForType(direction: DIRECTIONS, type: number): boolean {
  if (direction === 'NORTH' && [2, 5].includes(type)) { return true; }
  else if (direction === 'EAST' && [3, 6].includes(type)) { return true; }
  else if (direction === 'SOUTH' && [2, 5].includes(type)) { return true; }
  else if (direction === 'WEST' && [3, 6].includes(type)) { return true; }
  else { return false; }
}

/**
 * @description whether the player can move to the `direction` from the given args
 * @export
 * @param {DIRECTIONS} direction direction that the player wants to move to
 * @param {Maze} grid grid
 * @param {number} row starting row
 * @param {number} column staring column
 * @returns {boolean} whether desired move is possible
 */
export function canMovePlayerToPosition(direction: DIRECTIONS, grid: Maze, row: number, column: number): boolean {
  if (neighborExists(direction, grid, row, column)) {
    const currCellType = getCellType(grid, row, column);
    const neighborPosition = getNeighborPosition(direction, row, column);
    const neighborType = getCellType(grid, neighborPosition[0], neighborPosition[1]);
    const typeToUse = direction === 'NORTH' || direction === 'EAST' ? currCellType : neighborType;

    if (isMovementAllowedForType(direction, typeToUse) && neighborExists(direction, grid, row, column)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
