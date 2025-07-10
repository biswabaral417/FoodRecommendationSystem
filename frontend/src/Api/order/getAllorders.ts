import instance from '../../utils/axios/axios';

export const getAllOrders = async () => {
    try {
        const res = await instance.get('/order/get_all_orders');
        const json = res.data
        console.log("", json);
        return json;
    } catch (error) {
        console.error("order failed", error);
        throw error;
    }
};
