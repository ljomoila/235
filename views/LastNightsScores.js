import React from 'react';
import { Text, View } from 'react-native';
import { textBaseStyle } from '../App';
import ViewBase from './ViewBase';

const getYesterdayStr = () => {
  let date = new Date(new Date());
  date.setDate(date.getDate() - 1);

  return date.toISOString().split('T')[0];
};
export default class LastNightsScores extends ViewBase {
  styles = {
    game: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      padding: 10,
      justifyContent: 'space-evenly',
      borderBottomWidth: 1,
      borderBottomColor: '#454547'
    },
    teamContainer: {
      width: '40%',
      alignSelf: 'stretch',
      paddingTop: 5
    },
    team: {
      ...textBaseStyle,
      fontSize: 14,
      marginBottom: 8
    },
    player: {
      ...textBaseStyle,
      fontSize: 12,
      marginBottom: 5
    },
    scoreContainer: {
      flex: 1,
      alignItems: 'center',
      width: '20%',
      paddingTop: 5
    },
    score: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    scoreItem: {
      ...textBaseStyle,
      fontSize: 14,
      color: '#23ff06',
      marginBottom: 5
    },
    status: {
      ...textBaseStyle,
      fontSize: 10,
      color: '#fff',
      textAlign: 'center'
    }
  };

  constructor(props) {
    super(props);

    this.state = Object.assign(this.state, { games: null });
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.setState({ loading: true });

    const scheduledGames = await this.getScheduledGames();
    const games = await this.setGames(scheduledGames);

    await this.setTeams(games);

    this.setState({ games, loading: false });
  }

  async getScheduledGames() {
    let games = await this.api.getSchedule();

    const onGoingGames = games.filter(({ status }) => {
      return (
        status.abstractGameState.toUpperCase() === 'LIVE' ||
        status.abstractGameState.toUpperCase() === 'FINAL'
      );
    });
    if (onGoingGames.length === 0) {
      const yesterdaysGames = await this.api.getScheduleByDate(getYesterdayStr());
      games = games.concat(yesterdaysGames);
    }

    return games;
  }

  async setGames(schuduledGames) {
    const games = [];
    await Promise.all(
      schuduledGames.map(async ({ gamePk }) => {
        const game = await this.api.getLiveFeed(gamePk);

        const teams = game.liveData.boxscore.teams;
        teams.home.homeTeam = true;
        teams.home.goals = game.liveData.linescore.teams.home.goals;
        teams.away.goals = game.liveData.linescore.teams.away.goals;

        const dateTime = new Date(game.gameData.datetime.dateTime).getTime();
        const period = game.liveData.linescore.currentPeriodOrdinal;
        const timeRemaining = game.liveData.linescore.currentPeriodTimeRemaining;
        let status = game.gameData.status.detailedState.toUpperCase();

        if (period && timeRemaining) status = period + '\n(' + timeRemaining.toUpperCase() + ')';

        games.push({ status, dateTime, teams: { home: teams.home, away: teams.away } });
      })
    );

    games.sort((a, b) => {
      return a.dateTime - b.dateTime;
    });

    this.setTeamShortNames(games);

    return games;
  }

  async setTeams(games) {
    await Promise.all(
      games.map(async ({ teams }) => {
        const { home, away } = teams;
        home.players = this.setTeamPlayers(home.players);
        away.players = this.setTeamPlayers(away.players);

        this.setPlayersAdditionalInformation(home, away);
      })
    );
  }

  setPlayersAdditionalInformation(home, away) {
    // Set nationality and display name for the players
    const allPlayers = [...home.players, ...away.players];
    this.props.players
      .filter((p) => {
        return p.currentTeam.id === home.team.id || p.currentTeam.id === away.team.id;
      })
      .map((p) => {
        let player = allPlayers.filter((s) => {
          return p.id === s.player.id;
        });
        if (player.length) {
          player[0].player.displayName = p.lastName;
          player[0].player.nationality = p.nationality;
        }
      });
  }

  setTeamPlayers(players) {
    const _players = [];
    for (const [key, value] of Object.entries(players)) {
      const player = players[key];
      const { goals, assists } = player.stats.skaterStats || { goals: 0, assists: 0 };

      if (goals > 0 || assists > 0)
        _players.push({ type: 'scorer', player: players[key].person, goals, assists });
      if (player.position.code === 'G') {
        const { saves, shots, savePercentage, timeOnIce, _goals, _assists } =
          player.stats.goalieStats;
        let points = '';
        if (timeOnIce === '00:00' || isNaN(savePercentage)) continue;
        if (_goals > 0 || _assists > 0) points = _goals + '-' + _assists;
        _players.push({
          type: 'goalie',
          player: player.person,
          saves,
          shots,
          savePercentage,
          points
        });
      }
    }
    return _players;
  }

  setTeamShortNames(games) {
    games.map(({ teams }) => {
      const { home, away } = teams;
      this.props.teams.map((t) => {
        if (t.id === home.team.id) home.shortName = t.shortName;
        else if (t.id === away.team.id) away.shortName = t.shortName;
      });
    });
  }

  compareScorers(a, b) {
    let pointsA = a.goals + a.assists;
    let pointsB = b.goals + b.assists;
    let comparison = pointsA > pointsB ? -1 : 1;

    // TODO this is suppose to set player with more goals on top
    if (pointsA === pointsB) comparison = a.goals > b.goals ? -1 : 1;

    return comparison;
  }

  renderStatus(teams, status) {
    return (
      <View style={this.styles.scoreContainer}>
        <Text style={this.styles.scoreItem}>
          {teams.home.goals}-{teams.away.goals}
        </Text>
        <Text style={this.styles.status}>{status}</Text>
      </View>
    );
  }

  renderTeam(team) {
    const align = team.homeTeam ? 'left' : 'right';
    const containerStyles = { ...this.styles.teamContainer, textAlign: align };
    const stylesTeam = { ...this.styles.team, textAlign: align };
    const playerStyles = { ...this.styles.player, textAlign: align };

    const scorers = team.players.filter((p) => {
      return p.type === 'scorer';
    });
    scorers.sort((a, b) => this.compareScorers(a, b));
    const goalies = team.players.filter((p) => {
      return p.type === 'goalie';
    });

    return (
      <View style={containerStyles}>
        <Text style={stylesTeam}>{team.shortName}</Text>
        {this.renderScorers(scorers, playerStyles)}
        {this.renderGoalies(goalies, playerStyles)}
      </View>
    );
  }

  renderScorers(scorers, styles) {
    return scorers.map(({ player, goals, assists }, i) => {
      const scorerStyles = {
        ...styles,
        color: player.nationality === 'FIN' ? '#23ff06' : '#21ffff'
      };
      return (
        <Text key={i} style={scorerStyles}>
          {player.displayName} {goals}+{assists}
        </Text>
      );
    });
  }

  renderGoalies(goalies, styles) {
    return goalies.map(({ player, saves, shots, savePercentage, points }, i) => {
      styles.color = player.nationality === 'FIN' ? '#23ff06' : '#f0f';
      return (
        <Text key={i} style={styles}>
          {player.displayName} {saves}/{shots}
          {'\n'} {Math.round(savePercentage * 100) / 100}% {points}
        </Text>
      );
    });
  }

  _render() {
    return this.state.games.map(({ teams, status }, i) => (
      <View key={i} style={this.styles.game}>
        {this.renderTeam(teams.home)}
        {this.renderStatus(teams, status)}
        {this.renderTeam(teams.away)}
      </View>
    ));
  }
}
