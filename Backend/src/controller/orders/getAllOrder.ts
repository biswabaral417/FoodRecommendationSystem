import { Request, Response } from "express";
import { Order } from "../../db/QueryHandlers/order/orders";

const getAllOrders = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const orders = await Order.getAllByUserId(userId);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        return res.status(200).json({ orders });
    } catch (error) {
        console.error('Get All Orders error:', error);
        return res.status(500).json({ error: 'Failed to retrieve orders' });
    }
}

export default getAllOrders