import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { HotKeys } from "react-hotkeys";
import { Dispatch } from 'redux';
import { createGlobalStyle, ThemeProvider } from "styled-components";
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

  const keyMap = {
    MOVE_NORTH: ['up', 'w'],
    MOVE_SOUTH: ['down', 's'],
    MOVE_EAST: ['right', 'd'],
    MOVE_WEST: ['left', 'a']
  };

  return (
    <HotKeys keyMap={keyMap}>
      <div className="App">
        <Scoreboard />
        <Maze />
      </div>
    </HotKeys>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connect: () => {
    dispatch(socketConnect());
  }
})

export default connect( null, mapDispatchToProps)(App);
