import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScoreContext } from '../context/Score/ScoreContext';
import ScorePlayer from './ScorePlayer';
import { TeleText } from './TeleText';

const ScoreTeam = ({ team, homeTeam }) => {
    const { scoreState, dispatch } = useContext(ScoreContext);

    const textAlign = homeTeam ? 'left' : 'right';
    const containerStyles = { ...styles.teamContainer, textAlign };
    const stylesTeam = { ...styles.team, textAlign };
    const playerStyles = { textAlign };

    const onPlayerPressed = (player) => {
        dispatch({ ...scoreState, activePlayer: player });
    };

    return (
        <View style={containerStyles}>
            <TeleText style={stylesTeam}>{team.shortName || team.name}</TeleText>
            {team.players.map((player, i) => {
                return (
                    <ScorePlayer
                        key={i}
                        player={player}
                        styles={playerStyles}
                        onPress={() => onPlayerPressed(player)}
                    ></ScorePlayer>
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
