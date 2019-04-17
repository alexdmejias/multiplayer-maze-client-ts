import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { HotKeys } from "react-hotkeys";

import {AppStoreState} from '../../store';
import {playerMoved} from '../../store/player/actions'
import {SessionState, Maze} from '../../store/session/types';
import { PlayerState } from '../../store/player/types';

import {
  getCellType,
  getNeighborPosition,
  neighborExists,
  isMovementAllowedForType,
  canMovePlayerToPosition
} from './utils';
import Cell from './cell';


const getMazeStyles = (cellSize: number, rows: number, columns: number) => ({
  display: 'grid',
  // background: 'tomato',
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  minWidth: `${cellSize * rows}px`,
  minHeight: `${cellSize * columns}px`,
});

const overlayStyles = {
  background: 'black',
  display: 'flex',
  width: 500,
  height: 500,
  color: 'white',
  justifyContent: 'center',
  alignItems: 'center'
}

type MazeProps = {
  session: SessionState,
  player: PlayerState
  playerMove: Function
}

type DIRECTIONS = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

class MazeComponent extends React.Component<MazeProps> {

  wasd(direction: DIRECTIONS, grid: Maze, row: number, column: number, callback: Function, playerCanMove: Boolean) {
    if (playerCanMove && canMovePlayerToPosition(direction, grid, row, column)) {
      callback(...getNeighborPosition(direction, row, column));
    };
  }

  render() {
    const {session: {grid, currentState}, player} = this.props;
    const {row, column, canMove} = player;

    const handlers = {
      MOVE_NORTH: () => this.wasd('NORTH', grid.maze, row, column, this.props.playerMove, canMove),
      MOVE_SOUTH: () => this.wasd('SOUTH', grid.maze, row, column, this.props.playerMove, canMove),
      MOVE_EAST: () => this.wasd('EAST', grid.maze, row, column, this.props.playerMove, canMove),
      MOVE_WEST: () => this.wasd('WEST', grid.maze, row, column, this.props.playerMove, canMove)
    };

    if (currentState === 'waiting') {
      return <div style={overlayStyles}>waiting...</div>
    } else {
      return (
        <HotKeys handlers={handlers}>
          <div className='grid' style={getMazeStyles(50, grid.rows, grid.columns)}>
            { grid.maze.map((row, rowIndex) => {
              return row.map((column, columnIndex) => {
                const id = `${rowIndex}-${columnIndex}`;
                const hasPlayer = rowIndex === player.row && columnIndex === player.column;
                const visited = player.visitedCellsStr.includes(id);

                return <Cell
                  id={id}
                  key={id}
                  type={column}
                  size={50}
                  player={hasPlayer}
                  visited={visited}
                />
              })
            }) }
          </div>
        </HotKeys>

      )
    }
  }
}

const mapStateToProps = (state: AppStoreState) => ({
  session: state.session,
  player: state.player
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  playerMove: (row: number, column: number) => {
    dispatch(playerMoved(row, column));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MazeComponent);
