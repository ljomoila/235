import { StyleSheet, View } from 'react-native';
import { TeleText } from './TeleText';

const ScoreStatus = ({ home, away, timeRemaining, period }) => {
    return (
        <View style={styles.scoreContainer}>
            <TeleText style={styles.scoreItem}>
                {home.goals}-{away.goals}
            </TeleText>
            <TeleText style={styles.status}>{timeRemaining}{"\n"}{period}</TeleText>
        </View>
    );
};

const styles = StyleSheet.create({
    scoreContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        paddingHorizontal: 6
    },
    scoreItem: {
        fontSize: 14,
        color: '#23ff06',
        marginBottom: 5,
    },
    status: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'center',
        flexShrink: 1
    }
});

export default ScoreStatus;
