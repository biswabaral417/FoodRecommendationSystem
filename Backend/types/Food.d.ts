interface FoodItem {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    cuisine: string,
    calories: number,
    fat: number,
    protein: number,
    carbs: number,
    tags: string[] = [],
    suitableWeatherTags: string[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
}

interface FoodScore {
  food: any;
  score: number;
}

type FoodUpdateParams = [
    string | null, // name
    string | null, // cuisine
    number | null, // calories
    string | null, // image_url
    number | null, // fat
    number | null, // protein
    number | null, // carbs
    string[] | null, // tags
    string[] | null, // suitable_weather_tags
    number | null, // price
    number // id
];
