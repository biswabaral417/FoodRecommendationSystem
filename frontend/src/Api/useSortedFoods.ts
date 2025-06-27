
import instance from '../utils/axios/axios';
// hooks/useFoods.ts
import { useQuery } from '@tanstack/react-query';

const fetchSortedFoods = async ():Promise<Food[]> => {
  const position = await new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
  const { latitude, longitude } = position.coords;
  const res = await instance.get(`/foods/get_sorted?lat=${latitude}&lng=${longitude}`);
  return res.data;
};


export const useSortedFoods = () => {
  return useQuery({
    queryKey: ['sortedFoods'],
    queryFn: fetchSortedFoods,
  });
};