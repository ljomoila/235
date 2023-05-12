import { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { TeleText } from '../components/TeleText';
import { Topbar } from '../components/Topbar';
import { ScoreContext } from '../context/Score/ScoreContext';
import { usePlayerStats } from '../hooks/usePlayerStats';
import { colors } from '../App.styles';

export const PlayerCard = () => {
  const { scoreState, dispatch } = useContext(ScoreContext);
  const { loading, stats, error } = usePlayerStats('yearByYear');

  const onBack = () => {
    dispatch({ ...scoreState, activePlayer: null });
  };

  if (loading) return <ActivityIndicator />;
  else if (error) return <TeleText style={{ color: 'red' }}>Failed to load player stats</TeleText>;

  return (
    <>
      <Topbar left={{ title: 'Back', onPress: onBack }} title={scoreState.activePlayer.fullName} />

      {Object.entries(stats).map((key, value) => {
        return (
          <TeleText
            key={value}
            style={{ lineHeight: 15, color: colors.blue }}
          >{`${key[0]}: ${key[1]}`}</TeleText>
        );
      })}
    </>
  );
};
