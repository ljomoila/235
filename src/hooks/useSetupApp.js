import { useFonts } from 'expo-font';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/App/AppContext';

export const useSetupApp = () => {
    const { appState, dispatch } = useContext(AppContext);
    let [fontsLoaded] = useFonts({
        Teletext: require('../../assets/fonts/EuropeanTeletext.otf')
    });

    const setup = async () => {
        if (!fontsLoaded) return;

        dispatch({ ...appState, loading: false });
    };

    useEffect(() => {
        setup();
    }, [fontsLoaded]);
};
