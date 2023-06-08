import { useContext } from 'react';
import { colors } from '../App.styles';
import { TeleText } from './TeleText';
import { AppContext } from '../context/App/AppContext';
import { ScoreContext } from '../context/Score/ScoreContext';

const ScorePlayer = ({ player, styles }) => {
    const { appState } = useContext(AppContext);
    const { scoreState, dispatch } = useContext(ScoreContext);
    const { position, lastName, nationality, points } = player;

    styles.color = nationality === appState.selectedCountry ? colors.green : colors.blue;

    const renderStats = () => {
        if (position === 'Skater') {
            return `${lastName} ${points}`;
        } else if (position === 'Goalie') {
            const { saves, savePercentage, shots } = player;

            return `${lastName} ${saves}/${shots}\n${savePercentage}% ${points ? points : ''}`;
        }
    };

    const onPress = (player) => {
        dispatch({ ...scoreState, activePlayer: player });
    };

    return (
        <TeleText style={styles} onPress={() => onPress(player)}>
            {renderStats()}
        </TeleText>
    );
};

export default ScorePlayer;
