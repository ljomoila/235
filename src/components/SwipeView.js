import { useContext } from 'react';
import { AppContext, Views } from '../context/App/AppContext';
import { ScrollView } from 'react-native';
import { useSwipe } from '../hooks/useSwipe';

const SwipeView = ({ style, children }) => {
    const { appState, dispatch } = useContext(AppContext);
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    function onSwipeLeft() {
        if (appState.activeView === Views.SELECT_COUNTRY) {
            dispatch({ ...appState, activeView: Views.SCORES });
        }
    }

    function onSwipeRight() {
        if (appState.activeView === Views.SCORES) {
            dispatch({ ...appState, activeView: Views.SELECT_COUNTRY });
        }
    }

    return (
        <ScrollView style={style} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {children}
        </ScrollView>
    );
};

export default SwipeView;
