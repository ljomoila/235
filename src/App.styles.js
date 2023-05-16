import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black'
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
