import { Request, Response } from 'express';
import { recommendFoods } from '../../services/RecommendFoods';
import { fetchCurrentWeather } from '../../utils/fetchCurrentWeather';
import { generateWeatherTags } from '../../services/generater_tags';
import { constrainedMemory } from 'process';


const sortFoods = async (req: Request, res: Response): Promise<any> => {
  try {
    const latitude = parseFloat(req.query.lat as string);
    const longitude = parseFloat(req.query.lng as string);
    console.log({ "lat": latitude })

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
    
    const raw_weather = await fetchCurrentWeather(latitude, longitude);
    const weather = generateWeatherTags(raw_weather);
    const sortedFoods = await recommendFoods(weather, 10);
    console.log("llong")
    return res.json(sortedFoods);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ error: 'Failed to get recommendations' });
    
  }
};

export default sortFoods;
