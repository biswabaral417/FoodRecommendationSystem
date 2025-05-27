// generateWeatherTags.ts
import  weather_tags from './weather_tags';

export function generateWeatherTags(raw: {
  temperature_2m: number;
  weather_code: number;
  relative_humidity_2m: number;
}): {
  temperatureTag: 'hot' | 'cold' | 'average';
  weatherTag: 'sunny' | 'cloudy' | 'rainy';
  humidityTag: 'dry' | 'humid' | 'normal';
} {
  const { temperature_2m, weather_code, relative_humidity_2m } = raw;

  const temperatureTag =
    temperature_2m >= 30 ? 'hot' :
    temperature_2m <= 15 ? 'cold' :
    'average';

  const humidityTag =
    relative_humidity_2m >= 70 ? 'humid' :
    relative_humidity_2m <= 40 ? 'dry' :
    'normal';


  const weatherTag = weather_tags(weather_code);

  return { temperatureTag, weatherTag, humidityTag };
}
