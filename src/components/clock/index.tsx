import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { AppStoreState } from "../../store";
import { SessionState } from '../../store/session/types';

type ClockProps = {
  session: SessionState;
}

const Clock = ({session}: ClockProps) => {
  const [index, setIndex] = useState(1);
  const [currState, setCurrState] = useState(session.currentState);

  useEffect(() => {
    if (session.currentState === 'first') return;
    const id = setInterval(() => {
      setIndex(index + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [index, currState]);

  if (currState !== session.currentState) {
    setIndex(1);
    setCurrState(session.currentState);
  }

  const timeLeft = session.duration - (1000 * index);
  return (
    <p>{timeLeft} seconds left</p>
  )
}

const mapStateToProps = (state: AppStoreState) => ({
  session: state.session
});

export default connect(mapStateToProps)(Clock);
