import React from 'react';
import {connect} from 'react-redux';
import {AppStoreState} from '../../store';
import {ScoreboardState} from '../../store/scoreboard/types';
import { PlayerState } from '../../store/player/types';

type ScoreboardProps = {
  scoreboard: ScoreboardState;
  playerId: string;
  playerUsername: string;
  playerCurrentScore: number;
}

class Scoreboard extends React.Component<ScoreboardProps> {
  render() {
    const {scoreboard, playerId, playerUsername, playerCurrentScore} = this.props;

    return (
      <div className="scoreboard panel">
        <h1>Scoreboard:</h1>
        <p>{playerUsername}</p>
        <ol>
          {scoreboard.ids.map(currId => {
            const {username, currentScore} = scoreboard.byId[currId];
            return <li key={currId} className={currId === playerId ? 'current' : ''}>{username} - {currentScore}</li>
          })}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStoreState) => ({
  scoreboard: state.scoreboard,
  playerId: state.player.id,
  playerUsername: state.player.username,
  playerCurrentScore: state.player.currentScore
})

export default connect(mapStateToProps, null)(Scoreboard);
