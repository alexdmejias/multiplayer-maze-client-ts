import React from 'react';
import classnames from 'classnames';

const borderString = '3px solid black';

const getCellStyles = (size: number, type: number, player: boolean, visited: boolean) => ({
  height: size,
  width: size
})

interface CellProps {
  id: string
  type: number
  size: number
  isPlayer: boolean
  isVisited: boolean
  isStarting: boolean
  isEnding: boolean
}

const Cell = ({id, type, size, isPlayer, isVisited, isEnding, isStarting}: CellProps) => {
  const classes = classnames({
    cell: true,
    visited: isVisited,
    player: isPlayer,
    starting: isStarting,
    ending: isEnding,
    bt: type === 6,
    br: type === 5
  });

  return (
    <div className={classes} style={getCellStyles(size, type, isPlayer, isVisited)} >
      {id}
        <br />
      {type}
    </div>
  )
}

export default Cell;
