import React from 'react';
import classnames from 'classnames';

const getCellStyles = (size: number) => ({
  height: size,
  width: size
})

interface CellProps {
  id: string
  type: string
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
    bt: ['8', '3', '1'].includes(type),
    br: ['6', '3', '1'].includes(type)
  });

  return (
    <div className={classes} style={getCellStyles(size)} >
      {/* {id}
        <br />
      <b>{type}</b> */}
    </div>
  )
}

export default Cell;
