import { getTopOrderedFoodsToday, getAllFoods } from './recommendation';
import { Pool } from 'pg';
const pool = new Pool();

interface WeatherData {
  temperatureTag: 'hot' | 'cold' | 'average';
  weatherTag: 'sunny' | 'rainy' | 'cloudy';
  humidityTag: 'dry' | 'humid' | 'normal';
}

interface FoodScore {
  food: any;
  score: number;
}

export async function recommendFoods(weather: WeatherData, topN = 5) {
  const [foods, topOrders] = await Promise.all([
    getAllFoods(),
    getTopOrderedFoodsToday()
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
    console.log(`Food: ${food.name || food.id}, Score: ${(tagScore + orderScore).toFixed(4)}`);
    console.log('Food:', food.name);
    console.log('Tags:', tags , 'Weather:', weather.weatherTag);
    console.log('Weather Tags:', weather.temperatureTag, weather.weatherTag, weather.humidityTag);
    console.log('Order count for this food:', orderMap.get(food.id));



    return {
      food,
      score: tagScore + orderScore,
    };
  });

  scores.sort((a, b) => b.score - a.score);

  return scores.slice(0, topN).map(item => item.food);
}

