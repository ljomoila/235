import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native';
import { useContext, useState } from 'react';
import { AppContext, Views } from '../context/App/AppContext';

// TODO: fetch and map all current countries from API
const COUNTRIES = {
    'United States': 'USA',
    Canada: 'CAN',
    Finland: 'FIN',
    Sweden: 'SWE',
    'Czech Republic': 'CZE',
    Russia: 'RUS',
    Switzerland: 'SUI',
    Slovakia: 'SVK',
    Germany: 'GER',
    Denmark: 'DEN',
    Norway: 'NOR',
    Belarus: 'BLR',
    Latvia: 'LAT',
    France: 'FRA',
    Austria: 'AUT',
    Slovenia: 'SLO',
    Kazakhstan: 'KAZ',
    'United Kingdom': 'GBR',
    Italy: 'ITA',
    Hungary: 'HUN',
    Ukraine: 'UKR',
    Poland: 'POL',
    Japan: 'JPN',
    'South Korea': 'KOR'
};

const SelectCountry = () => {
    const { appState, dispatch } = useContext(AppContext);
    const [country, setCountry] = useState(appState.selectedCountry);

    const onCountryChange = (value) => {
        setCountry(value);
    };

    const onSelect = () => {
        dispatch({ ...appState, selectedCountry: country, activeView: Views.SCORES });
    };

    return (
        <>
            <Picker
                testID="select-country"
                selectedValue={country}
                onValueChange={onCountryChange}
                itemStyle={{
                    color: 'blue'
                }}
            >
                {Object.entries(COUNTRIES)
                    .sort()
                    .map(([key, value]) => (
                        <Picker.Item key={key} label={key} value={value} />
                    ))}
            </Picker>

            <Button title="Select" onPress={onSelect} />
        </>
    );
};

export default SelectCountry;
