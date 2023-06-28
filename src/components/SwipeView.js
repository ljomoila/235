import { useContext } from 'react';
import { AppContext, Views } from '../context/App/AppContext';
import { ScrollView } from 'react-native';
import { useSwipe } from '../hooks/useSwipe';

const SwipeView = ({ style, children }) => {
    const { appState, dispatch } = useContext(AppContext);
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    // TODO: put views in list when more than two views
    const onSwipeLeft = () => {
        if (appState.activeView === Views.SELECT_COUNTRY) {
            dispatch({ ...appState, activeView: Views.SCORES });
        }
    };

    const onSwipeRight = () => {
        if (appState.activeView === Views.SCORES) {
            dispatch({ ...appState, activeView: Views.SELECT_COUNTRY });
        }
    };

    return (
        <ScrollView style={style} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {children}
        </ScrollView>
    );
};

export default SwipeView;
