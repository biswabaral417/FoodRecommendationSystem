const sunnyCodes = [0, 1] as const;
const cloudyCodes = [2, 3, 45, 48, 77] as const;
const rainyCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 80, 81, 82, 85, 86, 95, 96, 99] as const;

const weather_tags = (weather_code: number): 'sunny' | 'cloudy' | 'rainy' => {
  if (sunnyCodes.includes(weather_code as any)) return 'sunny';
  if (cloudyCodes.includes(weather_code as any)) return 'cloudy';
  if (rainyCodes.includes(weather_code as any)) return 'rainy';
  return 'cloudy'; // fallback
};

export default weather_tags;
