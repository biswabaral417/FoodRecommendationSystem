import { Food } from '../db/QueryHandlers/food/food';


export async function recommendFoods(weather: WeatherData, topN = 5) {
  const [foods, topOrders] = await Promise.all([
    Food.getAll(),
    Food.getTopOrdered()
  ]);

  const orderMap = new Map<number, number>();
  topOrders.forEach((item: any) => {
    orderMap.set(item.id, Number(item.order_count));
  });

  const scores: FoodScore[] = foods.map(food => {
    const tags: string[] = food.tags || [];
    const tagScore =
      (tags.includes(weather.temperatureTag) ? 0.3 : 0) +
      (tags.includes(weather.weatherTag) ? 0.2 : 0) +
      (tags.includes(weather.humidityTag) ? 0.2 : 0);

    const orderScore = (orderMap.get(food.id) || 0) * 0.001;


    return {
      food,
      score: tagScore + orderScore,
    };
  });

  scores.sort((a, b) => b.score - a.score);

  return scores.slice(0, topN).map(item => item.food);
}

