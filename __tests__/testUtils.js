import { AppContext, initialAppState } from '../context/App/AppContext';
import { initialScoreState } from '../context/Score/ScoreContext';
import { ScoreContext } from '../context/Score/ScoreContext';
import { render } from '@testing-library/react-native';

export const renderTest = (component, props = {}) => {
    return render(
        <AppContext.Provider
            value={{ dispatch: jest.fn(), appState: props.appState || initialAppState }}
        >
            <ScoreContext.Provider
                value={{ dispatch: jest.fn(), scoreState: props.scoreState || initialScoreState }}
            >
                {component}
            </ScoreContext.Provider>
        </AppContext.Provider>
    );
};
