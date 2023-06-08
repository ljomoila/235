import { useContext, useEffect, useState } from 'react';
import { getDateStr } from '../components/ScoresTopbar';
import { AppContext } from '../context/App/AppContext';
import { ScoreContext } from '../context/Score/ScoreContext';

const useScores = () => {
    const { appState } = useContext(AppContext);
    const { api } = appState;
    const { scoreState, dispatch } = useContext(ScoreContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [games, setGames] = useState([]);

    const fetch = async () => {
        if (!scoreState.update) return;

        setLoading(true);

        try {
            const games = await api.getGames(getDateStr(scoreState.dateIndex));
            setGames(games);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
            dispatch({ ...scoreState, update: false });
        }
    };

    useEffect(() => {
        fetch();
    }, [scoreState.update]);

    return { loading, games, error };
};

export default useScores;
