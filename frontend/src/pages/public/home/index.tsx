// Home.tsx
import React from 'react';
import { useSortedFoods } from '../../../Api/useSortedFoods';
import FoodCard from './components/FoodCard';

const MIN_CARDS = 8;
const MockFoodObj = {
  name: "",
  cuisine: "",
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
  tags: [],
  suitableWeatherTags: [],
  imageUrl: "",
  price: 0
}

const Home: React.FC = () => {
  const { data, isLoading, error } = useSortedFoods();
  const total = Math.max(data?.length || 0, MIN_CARDS);

  
  if (error) return <div>Error loading foods.</div>;
  return (
    <div className=" w-full flex flex-wrap justify-center gap-4 p-4">
      {Array.from({ length: total }).map((_, i) => {
        const food = data?.[i];
        return food ? (
          <FoodCard key={food.id} food={food} isLoading={isLoading} />
        ) : (
          <FoodCard key={`skeleton-${i}`} food={{ id: i, ...MockFoodObj }} isLoading={true} />
        );
      })}

    </div>
  );
};

export default Home;
