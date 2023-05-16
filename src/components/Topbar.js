import { Button, Text, View } from 'react-native';

export const Topbar = ({ left, title, right }) => {
    return (
        <View
            style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5
            }}
        >
            {left ? <Button title={left.title} onPress={() => left.onPress()} /> : <View></View>}
            {title ? <Text style={{ color: 'white' }}>{title}</Text> : <View></View>}
            {right ? <Button title={right.title} onPress={() => right.onPress()} /> : <View></View>}
        </View>
    );
};
