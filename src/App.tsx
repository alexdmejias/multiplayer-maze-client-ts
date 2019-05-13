import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { socketConnect } from './store/middleware/socketio/actions';

import Scoreboard from './components/scoreboard';
import Maze from './components/maze';
import Settings from './components/settings';
import Clock from './components/clock';

type AppProps = {
  connect: Function
}

const Debug = connect( null, (d) => ({
  debug: (s) => d({ type: 'YOLOG', socketEvent: `debug:time-${s}`})
}))((props: any) => (
  <div>
    <p onClick={() => props.debug('stop')}>stop</p>
    <p onClick={() => props.debug('play')}>play</p>
  </div>
))

const App = (props: AppProps) => {
  useEffect(() => {
    props.connect();
  }, []);

  return (
    <div className="App">
      <Clock />
      <Debug />
      <Settings />
      <Scoreboard />
      <Maze />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connect: () => {
    dispatch(socketConnect());
  }
})

export default connect( null, mapDispatchToProps)(App);
