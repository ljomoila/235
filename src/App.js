import React, { useContext, useEffect } from 'react';
import { useSetupApp } from './hooks/useSetupApp';
import Scores from './views/Scores';
import AppContextProvider from './context/App/AppContextProvider';
import ScoreContextProvider from './context/Score/ScoreContextProvider';
import SelectCountry from './views/SelectCountry';
import { PlayerCard } from './views/PlayerCard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarButton } from './components/CalendarButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './views/Settings';
import { navigationTheme, tabStyles } from './App.styles';
import { AppContext } from './context/App/AppContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator {...{ tabStyles }}>
            <Tab.Screen
                name="Home"
                component={StackNavigator}
                options={{ headerShown: false, title: '235' }}
            />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Country" component={SelectCountry} />
            <Stack.Screen
                name="Scores"
                component={Scores}
                options={{
                    title: '235',
                    headerLeft: () => null,
                    headerRight: () => <CalendarButton />
                    // headerStyle: { backgroundColor: 'black' },
                    // headerTitleStyle: {
                    //     color: '#fff'
                    // }
                }}
            />
            <Stack.Screen name="Player" component={PlayerCard} />
            <Stack.Screen name="Stats" component={Settings} />
        </Stack.Navigator>
    );
};

const App = () => {
    useSetupApp();
    const { appState } = useContext(AppContext);
    const { api } = appState;

    useEffect(() => {
        // Preload team rosters in the background so they are warm for scores view
        api?.getTeamsWithRosters().catch((e) =>
            console.warn('Prefetch rosters failed', e.message)
        );
    }, [api]);

    return (
        <NavigationContainer theme={navigationTheme}>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default () => {
    return (
        <AppContextProvider>
            <ScoreContextProvider>
                <App />
            </ScoreContextProvider>
        </AppContextProvider>
    );
};
