
interface Food {
    id: number,
    name: string,
    cuisine: string,
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
    tags: string[],
    suitableWeatherTags: string[],
    imageUrl: string,
    price: number
}

interface cartObj {
    id: number
    count: number
}

