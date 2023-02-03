import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import useFont from './FontLoader';
import LastNightsScores from './views/LastNightsScores';
import teams from './assets/data/teams.json';
import players from './assets/data/players.json';
import Api from './Api';

const VIEW = {
  LAST_NIGHTS_SCORES: 0,
  TEAM: 1,
  PLAYER: 2
};

export const textBaseStyle = {
  fontFamily: 'Teletext',
  color: '#ffffff'
};

class App extends Component {
  state = {
    activeView: VIEW.LAST_NIGHTS_SCORES,
    teams,
    players,
    loading: false
  };

  constructor(props) {
    super(props);

    this.api = new Api();
  }

  async componentDidMount() {
    this.teams = await this.api.getTeams();
    this.players = await this.getPlayers();
  }

  async getPlayers() {
    let players = [];

    await Promise.all(
      this.teams.map(async ({ id }) => {
        const r = await this.api.getRoster(id);
        await Promise.all(
          r.map(async ({ person }) => {
            const player = await this.api.getPlayer(person.id);
            players.push(player);
          })
        );
      })
    );

    return players;
  }

  setActiveView(view) {
    this.setState({ activeView: view });
  }

  renderActiveView() {
    const { activeView, players, teams } = this.state;
    const commonProps = { api: this.api, teams, players, setActiveView: this.setActiveView };

    switch (activeView) {
      case VIEW.LAST_NIGHTS_SCORES: {
        return <LastNightsScores {...commonProps} />;
      }
      case VIEW.TEAM: {
        // TODO
        return null;
      }
      case VIEW.PLAYER: {
        // TODO
        return null;
      }
      default: {
        throw new Error('Unknown view');
      }
    }
  }

  render() {
    return (
      <>
        <StatusBar style="light" />
        <View style={styles.container}>
          {this.state.loading ? (
            <ActivityIndicator size="large" style={styles.loading} />
          ) : (
            this.renderActiveView()
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingBottom: 10,
    height: '100%',
    width: '100%',
    margin: 'auto',
    backgroundColor: 'black'
  },
  loading: {
    margin: 'auto',
    paddingTop: 10
  }
});

export default useFont(App);
