
import instance from '../../utils/axios/axios';
// hooks/useFoods.ts
import { useQuery } from '@tanstack/react-query';

const fetchAllFoods = async ():Promise<Food[]> => {
  const res = await instance.get(`/foods/get_all`);
  return res.data;
};


export const useAllFoods = () => {
  return useQuery({
    queryKey: ['sortedFoods'],
    queryFn: fetchAllFoods,
  });
};
