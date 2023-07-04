import React, { useContext } from 'react';
import { AppContext } from '../context/App/AppContext';
import { Topbar } from './Topbar';

export const getDateStr = (index) => {
    let date = new Date();
    date.setDate(date.getDate() + (index || 0));

    return formatDate(date);
};

export const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

export const ScoresTopbar = () => {
    const { appState, dispatch } = useContext(AppContext);

    const onButtonPress = (i) => {
        const newDateIndex = appState.dateIndex + i;
        dispatch({ ...appState, dateIndex: newDateIndex, updateScores: true });
    };

    return (
        <Topbar
            title={getDateStr(appState.dateIndex)}
            left={{ title: 'Back', onPress: () => onButtonPress(-1) }}
            right={{ title: 'Forward', onPress: () => onButtonPress(1) }}
        />
    );
};
