import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {AppStoreState} from '../../store';
import {SessionState} from '../../store/session/types';

import Cell from './cell';

const getMazeStyles = (cellSize: number, rows: number, columns: number) => ({
  display: 'grid',
  background: 'tomato',
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  minWidth: `${cellSize * rows}px`,
  minHeight: `${cellSize * columns}px`,
})

type MazeProps = {
  session: SessionState
}

class MazeComponent extends React.Component<MazeProps> {
  render() {
    const {grid} = this.props.session;
    return (
      <div style={getMazeStyles(50, grid.rows, grid.columns)}>
        {
          grid.maze.map((row, rowIndex) => {
            return row.map((column, columnIndex) => {
              const id = `${rowIndex}-${columnIndex}`
              return <Cell id={id} key={id} type={column} size={50}/>
            })
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppStoreState) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, null)(MazeComponent);
