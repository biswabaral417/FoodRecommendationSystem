import express, { Request, Response } from 'express';
import { recommendFoods } from '../../services/RecommendFoods';
import { fetchCurrentWeather } from '../../utils/fetchCurrentWeather';
import { generateWeatherTags } from '../../services/generater_tags';


const sortFoods = async (req: Request, res: Response) => {
  try {
    const latitude = parseFloat(req.query.latitude as string);
    const longitude = parseFloat(req.query.longitude as string);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    const raw_weather = await fetchCurrentWeather(latitude, longitude);
    const weather=generateWeatherTags(raw_weather);
    console.log('Weather data:', weather);
    // Assuming recommendFoods returns a sorted array directly
    const sortedFoods = await recommendFoods(weather, 8);

    res.json(sortedFoods);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
};

export default sortFoods;
