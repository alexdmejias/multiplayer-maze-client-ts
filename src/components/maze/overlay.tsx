import React, {useEffect, useState} from 'react';

interface OverlayProps {
  scored: boolean;
}

const Overlay = (props: OverlayProps) => {
  return (
    <div className='overlay'>
      {
        props.scored &&
        <p>SCORE!</p>
      }
      <p>
        waiting for next round to begin{'...'}
      </p>
    </div>
  )
}

export default Overlay;
