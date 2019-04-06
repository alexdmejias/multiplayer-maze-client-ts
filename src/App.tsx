import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {AppStoreState} from './store';
import {ScoreboardState} from './store/scoreboard/types';
import {UiState} from './store/ui/types';
import {SessionState} from './store/session/types';
import { Dispatch } from 'redux';
import { changeModal } from "./store/ui/actions";

import Scoreboard from './components/scoreboard';
import Maze from './components/maze';
import { socketConnect } from './store/middleware/socketio/actions';

type props = {
  mainMessage?: string
  scoreboard: ScoreboardState,
  ui: UiState,
  session: SessionState,
  changeModal: Function,
  connect: Function
}

type myState = {
  clicks: number;
}

class App extends Component<props, myState> {
  state: myState = {
    clicks: 0
  }

  handleClick = () => {
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  resetClicks = () => {
    console.log()
    this.setState({
      clicks: 0
    });
  }

  wasd = (type?: string) => {
    console.log(type)
    this.props.changeModal(type)
  }

  componentDidMount() {
    this.props.connect();
  }

  render() {
    const {scoreboard} = this.props;
    return (
      <div className="App">
        <Scoreboard />
        <Maze />
        <h1>{this.props.session.currentState}</h1>
        {/* <h1 onClick={() => this.wasd()}>close</h1>
        <h1 onClick={() => this.wasd('help')}>modal: {this.props.ui.modal}</h1>

        {
          this.props.ui.modal &&
          <div>this is the modal</div>
        } */}
      </div>
    );
  }
}

const mapStateToProps = (state: AppStoreState) => ({
  scoreboard: state.scoreboard,
  ui: state.ui,
  session: state.session
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeModal: (type?: string) => {
    dispatch(changeModal(type))
  },
  connect: () => {
    dispatch(socketConnect())
  }
})

export default connect( mapStateToProps, mapDispatchToProps )(App);
