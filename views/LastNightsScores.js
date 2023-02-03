import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { textBaseStyle } from '../App';
import { ScorePlayer } from '../components/ScorePlayer';
import { getDateStr, ScoresTopbar } from '../components/ScoresTopbar';
import { PlayerCard } from './PlayerCard';
import ViewBase from './ViewBase';

export default class LastNightsScores extends ViewBase {
  styles = {
    loading: {
      marginTop: 45
    },
    gamesContainer: {
      marginTop: 35
    },
    noGames: {
      ...textBaseStyle,
      textAlign: 'center',
      height: '100%',
      marginTop: '50%',
      fontSize: 16
    },
    game: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      paddingBottom: 10,
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

    this.state = Object.assign(this.state, { games: [], dateIndex: 0, activePlayer: null });
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.setState({ loading: true });

    const scheduledGames = await this.api.getScheduleByDate(getDateStr(this.state.dateIndex));

    const games = await this.setGames(scheduledGames);

    await this.setTeams(games);

    this.setState({ games, loading: false });
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
      home.shortName = home.team.name;
      away.shortName = away.team.name;
      this.props.teams.map((t) => {
        if (t.id === home.team.id) home.shortName = t.shortName;
        else if (t.id === away.team.id) away.shortName = t.shortName;
      });
    });
  }

  sortScorers(a, b) {
    let pointsA = a.goals + a.assists;
    let pointsB = b.goals + b.assists;
    let comparison = pointsA > pointsB ? -1 : 1;

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
    scorers.sort((a, b) => this.sortScorers(a, b));
    const goalies = team.players.filter((p) => {
      return p.type === 'goalie';
    });

    return (
      <View style={containerStyles}>
        <Text style={stylesTeam}>{team.shortName || team.name}</Text>
        {this.renderScorers(scorers, playerStyles)}
        {this.renderGoalies(goalies, playerStyles)}
      </View>
    );
  }

  playerPressed(player) {
    console.log(player);
    this.setState({ activePlayer: player });
  }

  renderScorers(scorers, styles) {
    return scorers.map(({ player, goals, assists }, i) => {
      const scorerStyles = {
        ...styles,
        color: player.nationality === 'FIN' ? '#23ff06' : '#21ffff'
      };
      return (
        <ScorePlayer
          key={i}
          player={player}
          stats={`${goals}+${assists}`}
          styles={scorerStyles}
          playerPressed={(player) => this.playerPressed(player)}
        />
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

  setDate(index) {
    this.setState({ dateIndex: index }, () => {
      this.loadData();
    });
  }

  _render() {
    const { state, styles } = this;

    if (state.activePlayer)
      return (
        <PlayerCard
          player={state.activePlayer}
          onBack={() => this.setState({ activePlayer: null })}
        />
      );

    return (
      <View>
        <ScoresTopbar currentDateIndex={state.dateIndex} setDate={(date) => this.setDate(date)} />

        {state.loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <ScrollView
            style={styles.gamesContainer}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }
          >
            {!state.games.length && <Text style={styles.noGames}>No games scheduled</Text>}

            {state.games.map(({ teams, status }, i) => (
              <View key={i} style={styles.game}>
                {this.renderTeam(teams.home)}
                {this.renderStatus(teams, status)}
                {this.renderTeam(teams.away)}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}
