import React, { useContext } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { useSetupApp } from './hooks/useSetupApp';
import { AppContext, Views } from './context/App/AppContext';
import { styles } from './App.styles';
import Scores from './views/Scores';
import AppContextProvider from './context/App/AppContextProvider';
import ScoreContextProvider from './context/Score/ScoreContextProvider';
import LoadingSpinner from './components/LoadingSpinner';

// import { Logs } from 'expo';
// Logs.enableExpoCliLogging();

const App = () => {
    useSetupApp();
    const { appState } = useContext(AppContext);

    const renderActiveView = () => {
        switch (appState.activeView) {
            case Views.SCORES:
                return (
                    <ScoreContextProvider>
                        <Scores />
                    </ScoreContextProvider>
                );
            case Views.STANDINGS:
                return null;
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

            <View>{appState.loading ? <LoadingSpinner /> : renderActiveView()}</View>
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
