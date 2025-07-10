// hooks/useSortedFoods.ts
import { useQuery } from '@tanstack/react-query';
import instance from '../utils/axios/axios';

const fetchSortedFoods = async (): Promise<Food[]> => {
  return new Promise<Food[]>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await instance.get(`/foods/get_sorted?lat=${latitude}&lng=${longitude}`);
          resolve(res.data);
        } catch (err) {
          reject(err);
        }
      },
      (err) => {
        console.error('Geolocation failed fast:', err.message);
        reject(new Error('Location fetch failed.'));
      },
      {
        enableHighAccuracy: false, // FASTEST
        timeout: 3000,             // 3 seconds max
        maximumAge: 60000,         // Use up to 1min old location
      }
    );
  });
};

export const useSortedFoods = () => {
  return useQuery({
    queryKey: ['sortedFoods'],
    queryFn: fetchSortedFoods,
    staleTime: 60 * 1000, // Don't refetch for 1 min
  });
};
