import React from 'react';

const borderString = '1px dashed black';

const getCellStyles = (size: number, type: string) => ({
  height: size,
  width: size,
  backgroundColor: 'tomato',
  borderColor: 'tomato',
  ...(type === '5' && {borderRight: borderString}),
  ...(type === '6' && {borderTop: borderString}),
})

interface CellProps {
  id: string
  type: string
  size: number
}

const Cell = ({id, type, size}: CellProps) => {
  return (
    <div style={getCellStyles(size, type)} >
      {id}
        <br />
      {type}
    </div>
  )
}

export default Cell;
