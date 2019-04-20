import { Middleware } from "redux";
import { playerMoved, playerScored } from "../../player/actions";
import { canMovePlayerToPosition, getNeighborPosition } from "./utils";

type DIRECTIONS = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

const hotkeys: {[key: string] : DIRECTIONS} = {
  'w': 'NORTH',
  'a': 'WEST',
  's': 'SOUTH',
  'd': 'EAST',
  'ArrowUp': 'NORTH',
  'ArrowLeft': 'WEST',
  'ArrowRight': 'EAST',
  'ArrowDown': 'SOUTH',
}

const handler = (e: KeyboardEvent, store) => {
  const {getState, dispatch} = store;
  const {key} = e;

  const {player: {canMove, row, column}, session: {grid: {maze, ending}}} = getState();
  const direction = hotkeys[key];

  if (direction) {
    if (canMove && canMovePlayerToPosition(direction, maze, row, column)) {
      const neighborPosition = getNeighborPosition(direction, row, column);
      dispatch(playerMoved(...neighborPosition));

      if (ending.toString() === neighborPosition.toString()) {
        dispatch(playerScored());
      }
    }
  }
}

export const HotKeys: Middleware = store => {

  window.addEventListener('keydown', (e) => handler(e, store));

  return next => {
    return action => {
      return next(action);
    }
  }
};

export default HotKeys;
