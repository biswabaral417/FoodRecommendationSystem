

export const toSQLinOrder = (food: Partial<FoodItem>, id: number): FoodUpdateParams => {
    return [
        food.name ?? null,
        food.cuisine ?? null,
        food.calories ?? null,
        food.imageUrl ?? null,
        food.fat ?? null,
        food.protein ?? null,
        food.carbs ?? null,
        food.tags ?? null,
        food.suitableWeatherTags ?? null,
        food.price ?? null,
        id,
    ];
}
