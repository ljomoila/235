import { useContext, useEffect, useState } from 'react';
import Api from '../service/Api';
import { ScoreContext } from '../context/Score/ScoreContext';

export const usePlayerStats = (statsType) => {
  const { scoreState } = useContext(ScoreContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  const fetch = async () => {
    const api = new Api();

    try {
      const splits = await api.getPlayerStats(scoreState.activePlayer.id, statsType);
      setStats(splits[splits.length - 1].stat);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, stats, error };
};
