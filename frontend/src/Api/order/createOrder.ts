import instance from '../../utils/axios/axios';

type createOrderPayload =
    {
        items: orderItems[]
    }

type orderItems = {
    "food_id": number,
    "quantity": number
}

export const create_order = async (payload: createOrderPayload) => {
    try {
        const res = await instance.post('/order/create_order', payload);
        const json = res.data
        return json;
    } catch (error) {
        console.error("order failed", error);
        throw error;
    }
};
