import React from 'react';
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
import Stats from './views/Stats';

// import { Logs } from 'expo';
// Logs.enableExpoCliLogging();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={StackNavigator} />
            <Tab.Screen name="Stats" component={Stats} />
        </Tab.Navigator>
    );
};

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SelectCountry" component={SelectCountry} />
            <Stack.Screen
                name="Scores"
                component={Scores}
                options={{
                    headerRight: () => <CalendarButton />,
                    //headerStyle: { backgroundColor: 'black' },
                    contentStyle: { backgroundColor: 'black' }
                }}
            />
            <Stack.Screen name="PlayerCard" component={PlayerCard} />
            <Stack.Screen name="Stats" component={Stats} />
        </Stack.Navigator>
    );
};

const App = () => {
    useSetupApp();

    return (
        <NavigationContainer>
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
