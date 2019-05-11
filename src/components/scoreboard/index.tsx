import React from 'react';
import {connect} from 'react-redux';
import {AppStoreState} from '../../store';
import {ScoreboardState} from '../../store/scoreboard/types';

type ScoreboardProps = {
  scoreboard: ScoreboardState;
  playerId: string;
  playerUsername: string;
  playerCurrentScore: number;
}

const Scoreboard = ({scoreboard, playerId, playerUsername}: ScoreboardProps) => {
  return (
    <div className="scoreboard panel">
      <h1>You:</h1>
      <p>{playerUsername}</p>
      <h1>Top 50:</h1>
      <ol>
        {scoreboard.ids.map(currId => {
          const {username, currentScore} = scoreboard.byId[currId];
          return <li key={currId} className={currId === playerId ? 'current' : ''}>{username} - {currentScore}</li>
        })}
      </ol>
    </div>
  );
};

const mapStateToProps = (state: AppStoreState) => ({
  scoreboard: state.scoreboard,
  playerId: state.player.id,
  playerUsername: state.player.username,
  playerCurrentScore: state.player.currentScore
})

export default connect(mapStateToProps, null)(Scoreboard);
