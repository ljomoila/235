import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        marginTop: 10
    }
});

export const colors = {
    white: 'white',
    green: '#23ff06',
    purple: '#f0f',
    blue: '#21ffff'
};

export const getPlayerStyles = (player, selectedCountry) => {
    const color = player.nationality === selectedCountry ? colors.green : colors.blue;

    return { color };
};

export const navigationTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'black'
    }
};

export const tabStyles = {
    tabBarStyle: {
        background: 'black',
        height: 100
    },
    tabBarItemStyle: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10
    }
};

export const contentStyles = StyleSheet.create({
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    margin: 10
});
