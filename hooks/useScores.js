import { useContext, useEffect, useState } from 'react';
import Api from '../service/Api';
import { getDateStr } from '../components/ScoresTopbar';
import { AppContext } from '../context/App/AppContext';
import { ScoreContext } from '../context/Score/ScoreContext';

const useScores = () => {
  const { appState } = useContext(AppContext);
  const { scoreState, dispatch } = useContext(ScoreContext);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(false);
  const api = new Api();

  const fetch = async () => {
    if (!scoreState.update) return;

    setLoading(true);

    try {
      const scheduledGames = await api.getScheduleByDate(getDateStr(scoreState.dateIndex));
      const games = await setGames(scheduledGames);
      await setTeams(games);
      setScores(games);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
      dispatch({ ...scoreState, update: false });
    }
  };

  const setGames = async (schuduledGames) => {
    const games = [];
    await Promise.all(
      schuduledGames.map(async ({ gamePk }) => {
        const game = await api.getLiveFeed(gamePk);

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

    setTeamShortNames(games);

    return games;
  };

  const setTeams = async (games) => {
    await Promise.all(
      games.map(async ({ teams }) => {
        const { home, away } = teams;
        home.players = setTeamPlayers(home.players);
        away.players = setTeamPlayers(away.players);

        await setPlayersAdditionalInformation(home, away);
      })
    );
  };

  const setPlayersAdditionalInformation = async (home, away) => {
    // Set nationality and display name for the players
    const allPlayers = [...home.players, ...away.players];

    await Promise.all(
      allPlayers.map(async (p) => {
        const player = await api.getPlayer(p.player.id);
        p.player.displayName = player.lastName;
        p.player.nationality = player.nationality;
      })
    );
  };

  const setTeamPlayers = (players) => {
    const teamPlayers = [];
    for (const [key, value] of Object.entries(players)) {
      const player = players[key];
      const { goals, assists } = player.stats.skaterStats || { goals: 0, assists: 0 };

      if (goals > 0 || assists > 0)
        teamPlayers.push({ type: 'scorer', player: players[key].person, goals, assists });
      if (player.position.code === 'G') {
        const { saves, shots, savePercentage, timeOnIce, _goals, _assists } =
          player.stats.goalieStats;
        let points = '';
        if (timeOnIce === '00:00' || isNaN(savePercentage)) continue;
        if (_goals > 0 || _assists > 0) points = _goals + '-' + _assists;
        teamPlayers.push({
          type: 'goalie',
          player: player.person,
          saves,
          shots,
          savePercentage,
          points
        });
      }
    }
    return teamPlayers;
  };

  const setTeamShortNames = (games) => {
    games.map(({ teams }) => {
      const { home, away } = teams;
      home.shortName = home.team.name;
      away.shortName = away.team.name;
      appState.teams.map((t) => {
        if (t.id === home.team.id) home.shortName = t.shortName;
        else if (t.id === away.team.id) away.shortName = t.shortName;
      });
    });
  };

  useEffect(() => {
    fetch();
  }, [scoreState.update]);

  return { loading, scores, error };
};

export default useScores;
