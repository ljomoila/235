import { Text } from 'react-native';

const baseStyle = {
  fontFamily: 'Teletext',
  color: '#ffffff'
};

export const TeleText = ({ style, children, ...rest }) => {
  return (
    <Text style={{ ...baseStyle, ...style }} {...rest}>
      {children}
    </Text>
  );
};
