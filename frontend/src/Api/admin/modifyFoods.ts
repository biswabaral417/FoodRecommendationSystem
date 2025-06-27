import instance from "../../utils/axios/axios";



const modifyFood = async (payload: Food) => {
    const res = await instance.post('/admin/update_food', payload);
    return res.data;
};
export const modifyFoodData = async (data: Food) => {
    try {
        const json = await modifyFood(data);
        console.log(json);
        return json;
    } catch (error) {
        console.error("Failed to add food:", error);
        throw error;
    }
};