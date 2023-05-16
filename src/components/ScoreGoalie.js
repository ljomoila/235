import { useContext } from 'react';
import { colors } from '../App.styles';
import { TeleText } from './TeleText';
import { AppContext } from '../context/App/AppContext';

const ScoreGoalie = ({ stats, styles, onPress }) => {
    const { appState } = useContext(AppContext);
    const { player, saves, shots, savePercentage, points } = stats;

    styles.color = player.nationality === appState.selectedCountry ? colors.green : colors.purple;

    return (
        <TeleText style={styles} onPress={() => onPress(player)}>
            {player.displayName} {saves}/{shots}
            {'\n'} {Math.round(savePercentage * 100) / 100}% {points}
        </TeleText>
    );
};

export default ScoreGoalie;
