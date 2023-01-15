import React from 'react';
import { useFonts } from 'expo-font';

export default function useFont(Component) {
    const UseFont = function () {
        let [fontsLoaded] = useFonts({
        'FFF': require('./assets/fonts/FFF.otf'),
        'Teletext': require('./assets/fonts/EuropeanTeletext.otf'),
      });
      return <Component fontsLoaded />;
    }      
  return UseFont;
}