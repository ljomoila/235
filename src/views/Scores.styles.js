import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    game: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#454547'
    },
    player: {
        fontSize: 12,
        marginBottom: 5
    },
    scoreContainer: {
        flex: 1,
        alignItems: 'center',
        width: '20%',
        paddingTop: 5
    },
    score: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    scoreItem: {
        fontSize: 14,
        color: '#23ff06',
        marginBottom: 5
    },
    status: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'center'
    }
});
