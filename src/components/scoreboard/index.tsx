import React from 'react';
import {connect} from 'react-redux';
import {AppStoreState} from '../../store';
import {ScoreboardState} from '../../store/scoreboard/types';

type ScoreboardProps = {
  scoreboard: ScoreboardState
}

class Scoreboard extends React.Component<ScoreboardProps> {
  render() {
    const {scoreboard} = this.props;

    return (
      <div className="scoreboard panel">
        <h1>Scoreboard:</h1>
        <ul>
          {scoreboard.ids.map(currId => {
            const {username, currentScore} = scoreboard.byId[currId];
            return <li key={currId}>{username} - {currentScore}</li>
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStoreState) => ({
  scoreboard: state.scoreboard
})

export default connect(mapStateToProps, null)(Scoreboard);
