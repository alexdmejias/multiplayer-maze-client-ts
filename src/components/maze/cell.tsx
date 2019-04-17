import React from 'react';
import classnames from 'classnames';

const borderString = '2px solid black';

const getCellStyles = (size: number, type: number, player: boolean, visited: boolean) => ({
  height: size,
  width: size,
  // backgroundColor: 'tomato',
  // borderRightColor: 'black',
  // borderTopColor: 'black',
  ...(type === 5 && {borderRight: borderString}),
  ...(type === 6 && {borderTop: borderString}),
  // ...(visited && {backgroundColor: 'blue'}),
  // ...(player && {backgroundColor: 'grey'}),
})

interface CellProps {
  id: string
  type: number
  size: number
  player: boolean
  visited: boolean
}

const Cell = ({id, type, size, player, visited}: CellProps) => {
  const classes = classnames({
    cell: true,
    visited,
    player
  });

  return (
    <div className={classes} style={getCellStyles(size, type, player, visited)} >
      {id}
        <br />
      {type}
    </div>
  )
}

export default Cell;
