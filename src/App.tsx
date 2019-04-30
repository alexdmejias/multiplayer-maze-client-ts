import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { socketConnect } from './store/middleware/socketio/actions';

import Scoreboard from './components/scoreboard';
import Maze from './components/maze';
import Settings from './components/settings';

type AppProps = {
  connect: Function
}

const App = (props: AppProps) => {
  useEffect(() => {
    props.connect();
  }, []);

  return (
    <div className="App">
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
