import { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../context/Score/ScoreContext';
import { AppContext } from '../context/App/AppContext';

export const usePlayerStats = (statsType) => {
    const { scoreState } = useContext(ScoreContext);
    const { api } = useContext(AppContext).appState;
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(false);

    const fetch = async () => {
        try {
            const stats = await api.getPlayerStats(scoreState.activePlayer.id, statsType);

            setStats(stats);
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return { loading, stats, error };
};
