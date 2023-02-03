import { ActivityIndicator, Alert } from 'react-native';
import { TeleText } from '../components/TeleText';
import { Topbar } from '../components/Topbar';
import { usePlayer } from '../hooks/usePlayer';
import { colors } from '../styles';

export const PlayerCard = ({ player, onBack }) => {
  const { loading, data, error } = usePlayer(player);

  const renderStats = () => {
    return (
      <>
        {Object.entries(data).map((key, value) => {
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

  if (loading) return <ActivityIndicator />;
  else if (error) return <Alert>Failed to load player stats</Alert>;

  return (
    <>
      <Topbar left={{ title: 'Back', onPress: onBack }} title={player.fullName} />
      {renderStats()}
    </>
  );
};
