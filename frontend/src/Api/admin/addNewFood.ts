import instance from '../../utils/axios/axios';

type AddFoodPayload = {
    tags: string[];
    weatherTags: string[];
    name: string;
    cuisine: string;
    calories: number;
    imageUrl: string;
    fat: number;
    protein: number;
    carbs: number;
    price: number;
};


const addNewFood = async (payload: AddFoodPayload) => {
    const res = await instance.post('/admin/add_food', payload);
    return res.data;
};

export const addFood = async (data: AddFoodPayload) => {
    try {
        const json = await addNewFood(data);
        console.log(json);
        return json;
    } catch (error) {
        console.error("Failed to add food:", error);
        throw error;
    }
};
