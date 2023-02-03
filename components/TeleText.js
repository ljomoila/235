import { Text } from 'react-native';
import { textBaseStyle } from '../App';

export const TeleText = ({ style, children }) => {
  return <Text style={{ ...textBaseStyle, ...style }}>{children}</Text>;
};
