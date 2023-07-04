import { useContext, useState } from 'react';
import { Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScoreContext } from '../context/Score/ScoreContext';

export const CalendarButton = () => {
    const { scoreState, dispatch } = useContext(ScoreContext);
    const [show, setShow] = useState(true);

    const onChange = (event, selectedDate) => {
        dispatch({ ...scoreState, date: selectedDate, update: true });
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <>
            <Button title={''} onPress={showDatepicker} />
            {show && (
                <DateTimePicker
                    style={{ marginTop: -30 }}
                    value={scoreState.date}
                    mode="date"
                    onChange={onChange}
                />
            )}
        </>
    );
};
