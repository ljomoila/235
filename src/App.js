import React, { useContext } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { useSetupApp } from './hooks/useSetupApp';
import { AppContext, Views } from './context/App/AppContext';
import { styles } from './App.styles';
import Scores from './views/Scores';
import AppContextProvider from './context/App/AppContextProvider';
import ScoreContextProvider from './context/Score/ScoreContextProvider';
import LoadingSpinner from './components/LoadingSpinner';
import SelectCountry from './views/SelectCountry';
import SwipeView from './components/SwipeView';

// import { Logs } from 'expo';
// Logs.enableExpoCliLogging();

const App = () => {
    useSetupApp();
    const { appState } = useContext(AppContext);

    const renderActiveView = () => {
        switch (appState.activeView) {
            case Views.SELECT_COUNTRY:
                return <SelectCountry />;
            case Views.SCORES:
                return (
                    <ScoreContextProvider>
                        <Scores />
                    </ScoreContextProvider>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle="dark-content"
                showHideTransition="fade"
                hidden={false}
            />
            <SwipeView style={styles.container}>
                {appState.loading ? <LoadingSpinner /> : renderActiveView()}
            </SwipeView>
        </SafeAreaView>
    );
};

export default () => {
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    );
};
