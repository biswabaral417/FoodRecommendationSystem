import instance from '../../utils/axios/axios';

type AddFoodPayload = {
    tags: string[];
    weatherTags: string[];
    name: string;
    cuisine: string;
    calories: number;
    imageFile: File;
    fat: number;
    protein: number;
    carbs: number;
    price: number;
};

const addNewFood = async (payload: AddFoodPayload) => {
    const form = new FormData();
    form.append('name', payload.name);
    form.append('cuisine', payload.cuisine);
    form.append('calories', payload.calories.toString());
    form.append('fat', payload.fat.toString());
    form.append('protein', payload.protein.toString());
    form.append('carbs', payload.carbs.toString());
    form.append('price', payload.price.toString());
    form.append('tags', JSON.stringify(payload.tags));
    form.append('weatherTags', JSON.stringify(payload.weatherTags));
    form.append('image', payload.imageFile);

    const res = await instance.post('/admin/add_food', form);
    return res.data;
};

export const addFood = async (data: AddFoodPayload) => {
    try {
        const json = await addNewFood(data);
        if(json) window.alert("success")
        return json;
    } catch (error) {
        console.error("Failed to add food:", error);
        throw error;
    }
};
export default addFood;