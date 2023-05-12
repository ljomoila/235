import { TeleText } from './TeleText';

const Notification = ({ message, type = 'error' }) => {
    const color = type === 'error' ? 'red' : 'green';

    return (
        <TeleText style={{ color }} accessibilityHint={type}>
            {message}
        </TeleText>
    );
};

export default Notification;
