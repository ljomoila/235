import { useEffect, useState } from 'react';
import Api from '../Api';

export const usePlayer = (player) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetch = async () => {
    const api = new Api();

    try {
      const splits = await api.getPlayerStats(player.id, 'yearByYear');
      setData(splits[splits.length - 1].stat);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, data, error };
};
