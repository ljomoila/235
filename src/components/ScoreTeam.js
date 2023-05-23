import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScoreContext } from '../context/Score/ScoreContext';
import ScoreGoalie from './ScoreGoalie';
import ScorePlayer from './ScorePlayer';
import { TeleText } from './TeleText';

const ScoreTeam = ({ team }) => {
    const { scoreState, dispatch } = useContext(ScoreContext);

    const textAlign = team.homeTeam ? 'left' : 'right';
    const containerStyles = { ...styles.teamContainer, textAlign };
    const stylesTeam = { ...styles.team, textAlign };
    const playerStyles = { textAlign };

    // sort scorers by points, then goals
    const sortScorers = (a, b) => {
        let pointsA = a.goals + a.assists;
        let pointsB = b.goals + b.assists;
        let comparison = pointsA > pointsB ? -1 : 1;

        if (pointsA === pointsB) comparison = a.goals > b.goals ? -1 : 1;

        return comparison;
    };

    const scorers = team.players
        .filter((p) => {
            return p.type === 'scorer';
        })
        .sort((a, b) => sortScorers(a, b));

    const goalies = team.players.filter((p) => {
        return p.type === 'goalie';
    });

    const onPlayerPressed = (player) => {
        dispatch({ ...scoreState, activePlayer: player });
    };

    return (
        <View style={containerStyles}>
            <TeleText style={stylesTeam}>{team.shortName || team.name}</TeleText>
            {scorers.map((stats, i) => {
                return (
                    <ScorePlayer
                        key={i}
                        stats={stats}
                        styles={playerStyles}
                        onPress={() => onPlayerPressed(stats.player)}
                    ></ScorePlayer>
                );
            })}
            {goalies.map((stats, i) => {
                return (
                    <ScoreGoalie
                        key={i}
                        stats={stats}
                        styles={playerStyles}
                        onPress={() => onPlayerPressed(stats.player)}
                    ></ScoreGoalie>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    teamContainer: {
        width: '40%',
        alignSelf: 'stretch',
        paddingTop: 5
    },
    team: {
        fontSize: 14,
        marginBottom: 8
    }
});

export default ScoreTeam;
