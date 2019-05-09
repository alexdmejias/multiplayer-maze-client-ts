import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {AppStoreState} from '../../store';
import {SessionState, Maze} from '../../store/session/types';
import { PlayerState } from '../../store/player/types';

import Cell from './cell';
import Overlay from './overlay';

const getMazeStyles = (cellSize: number, rows: number, columns: number) => ({
  display: 'grid',
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  minWidth: `600px`,
  minHeight: `600px`,
});

type MazeProps = {
  session: SessionState,
  player: PlayerState
}

class MazeComponent extends React.Component<MazeProps> {

  render() {
    const {session: {grid, currentState}, player} = this.props;

    return (
      <div className="panel" style={{position: 'relative'}}>
        {
          (currentState === 'waiting' || player.scored) &&
          <Overlay scored={player.scored} />
        }
        {/* <Overlay show={player.scored || currentState === 'waiting'} /> */}
        <div className='grid' style={getMazeStyles(50, grid.rows, grid.columns)}>
          { grid.maze.map((row, rowIndex) => {
            const cellSize = 650 / grid.rows;

            return row.map((column, columnIndex) => {
              const id = `${rowIndex},${columnIndex}`;

              return <Cell
                id={id}
                key={id}
                type={column}
                size={cellSize}
                isEnding={id === grid.ending.toString()}
                isStarting={id === grid.starting.toString()}
                isPlayer={rowIndex === player.row && columnIndex === player.column}
                isVisited={player.visitedCellsStr.includes(id)}
              />
            })
          }) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStoreState) => ({
  session: state.session,
  player: state.player
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // playerScored: () => {
  //   dispatch(playerScored())
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(MazeComponent)
