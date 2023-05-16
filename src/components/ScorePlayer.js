import { useContext } from 'react';
import { colors } from '../App.styles';
import { TeleText } from './TeleText';
import { AppContext } from '../context/App/AppContext';

const ScorePlayer = ({ stats, styles, onPress }) => {
    const { appState } = useContext(AppContext);
    const { player, goals, assists } = stats;

    styles.color = player.nationality === appState.selectedCountry ? colors.green : colors.blue;

    return (
        <TeleText style={styles} onPress={() => onPress(player)}>
            {player.displayName} {`${goals}+${assists}`}
        </TeleText>
    );
};

export default ScorePlayer;
