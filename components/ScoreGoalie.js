import { colors } from '../App.styles';
import { TeleText } from './TeleText';

const ScoreGoalie = ({ stats, styles, onPress }) => {
  const { player, saves, shots, savePercentage, points } = stats;
  styles.color = player.nationality === 'FIN' ? colors.green : colors.purple;

  return (
    <TeleText style={styles} onPress={() => onPress(player)}>
      {player.displayName} {saves}/{shots}
      {'\n'} {Math.round(savePercentage * 100) / 100}% {points}
    </TeleText>
  );
};

export default ScoreGoalie;
