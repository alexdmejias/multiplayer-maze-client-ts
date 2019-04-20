import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Scoreboard from './components/scoreboard';
import Maze from './components/maze';
import { socketConnect } from './store/middleware/socketio/actions';

type AppProps = {
  connect: Function
}

const App = (props: AppProps) => {
  useEffect(() => {
    props.connect();
  }, []);

  return (
    <div className="App">
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
