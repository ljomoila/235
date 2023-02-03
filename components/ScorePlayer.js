import { useState } from 'react';
import { Text } from 'react-native';
import { textBaseStyle } from '../App';

export const ScorePlayer = ({ player, stats, styles, playerPressed }) => {
  const baseStyles = {
    ...textBaseStyle,
    ...styles,
    fontSize: 12,
    marginBottom: 5
  };

  return (
    <Text style={{ ...styles }} onPress={() => playerPressed(player)}>
      {player.displayName} {stats}
    </Text>
  );
};
