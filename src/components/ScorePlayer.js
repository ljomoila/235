import { useContext } from 'react';
import { colors } from '../App.styles';
import { TeleText } from './TeleText';
import { AppContext, Views } from '../context/App/AppContext';
import { ScoreContext } from '../context/Score/ScoreContext';
import { useNavigation } from '@react-navigation/native';

const ScorePlayer = ({ player, styles }) => {
    const { appState } = useContext(AppContext);
    const { scoreState, dispatch } = useContext(ScoreContext);
    const { position, lastName, nationality, goals, assists } = player;
    const navigation = useNavigation();

    styles.color = nationality === appState.selectedCountry ? colors.green : colors.blue;

    const renderStats = () => {
        if (position === 'Skater') {
            return `${lastName} ${goals}+${assists}`;
        } else if (position === 'Goalie') {
            const { saves, savePercentage, shots } = player;

            return `${lastName} ${saves}/${shots}\n${savePercentage}%`;
        }
    };

    const onPlayerPressed = (player) => {
        // TODO: create own context for the player
        dispatch({ ...scoreState, activePlayer: player });
        navigation.navigate('PlayerCard');
    };

    return (
        <TeleText style={styles} onPress={() => onPlayerPressed(player)}>
            {renderStats()}
        </TeleText>
    );
};

export default ScorePlayer;
