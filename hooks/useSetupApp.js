import { useFonts } from 'expo-font';
import { useContext, useEffect } from 'react';
import Api from '../service/Api';
import { AppContext } from '../context/App/AppContext';

export const useSetupApp = () => {
  const { appState, dispatch } = useContext(AppContext);
  let [fontsLoaded] = useFonts({
    Teletext: require('../assets/fonts/EuropeanTeletext.otf')
  });
  const api = new Api();

  const getTeams = async () => {
    if (!fontsLoaded) return;

    try {
      const teams = await api.getTeams();
      dispatch({ ...appState, teams, loading: false });
    } catch (e) {
      console.error(e);
      dispatch({ ...appState, error: e.message });
    }
  };

  useEffect(() => {
    getTeams();
  }, [fontsLoaded]);
};