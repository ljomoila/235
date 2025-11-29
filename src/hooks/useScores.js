import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/App/AppContext';
import { ScoreContext } from '../context/Score/ScoreContext';
import { formatDate } from '../components/ScoresTopbar';

const useScores = () => {
    const { appState } = useContext(AppContext);
    const { api } = appState;
    const { scoreState, dispatch } = useContext(ScoreContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [games, setGames] = useState([]);

    const fetch = async () => {
        if (!scoreState.update) return;

        setLoading(true);
        setError(false);

        try {
            const games = await api.getGames(formatDate(scoreState.date));
            setGames(games);
        } catch (e) {
            console.error(e);
            setError(true);
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
