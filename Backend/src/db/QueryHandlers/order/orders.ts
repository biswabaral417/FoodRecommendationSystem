import { pool } from '../../pool';

export class Order {
    constructor(
        public id: number,
        public userId: number,
        public payment_method: string = 'pending',
        public status: string = 'pending',
        public isPaid: boolean = false,
        public orderedAt: Date = new Date()
    ) { }

    static fromRow(row: any): Order {
        return new Order(
            row.id,
            row.user_id,
            row.payment_method || 'pending',
            row.status || 'pending',
            row.ispaid ?? false,
            new Date(row.ordered_at)
        );
    }

    static async createWithItems(
        userId: number,
        payment_method: string,
        status: string,
        items: {
            food_id: number;
            quantity: number;
            price_at_order: number;
        }[]
    ): Promise<Order> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // isPaid is NOT set here, default handled by DB
            const insertOrder = `
                INSERT INTO orders (user_id, payment_method, order_status)
                VALUES ($1, $2, $3)
                RETURNING *
            `;
            const orderRes = await client.query(insertOrder, [userId, payment_method, status]);

            const order = Order.fromRow(orderRes.rows[0]);
            

            const insertItem = `
                INSERT INTO order_items (order_id, food_id, quantity, price_at_order)
                VALUES ($1, $2, $3, $4)
            `;

            for (const item of items) {
                await client.query(insertItem, [
                    order.id,
                    item.food_id,
                    item.quantity,
                    item.price_at_order,
                ]);
            }

            await client.query('COMMIT');
            return order;
        } catch (err) {
            await client.query('ROLLBACK');
            console.error("Order creation failed:", err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Update payment status separately
    static async updatePaymentStatus(orderId: number, isPaid: boolean): Promise<void> {
        await pool.query(
            `UPDATE orders SET ispaid = $1 WHERE id = $2`,
            [isPaid, orderId]
        );
    }

    // Update order status separately
    static async updateOrderStatus(orderId: number, status: string): Promise<void> {
        await pool.query(
            `UPDATE orders SET status = $1 WHERE id = $2`,
            [status, orderId]
        );
    }

    // Function to get all orders for a user_id sorted by ordered_at in descending order along with their items
    static async getAllByUserId(userId: number): Promise<Order[]> {
        const ordersResult = await pool.query(
            `SELECT * FROM orders WHERE user_id = $1 ORDER BY ordered_at DESC`,
            [userId]
        );

        const orders = ordersResult.rows;

        if (orders.length === 0) return [];

        const orderIds = orders.map(o => o.id);
        const itemsResult = await pool.query(
            `SELECT * FROM order_items WHERE order_id = ANY($1)`,
            [orderIds]
        );

        const itemsByOrderId = new Map<number, any[]>();
        for (const item of itemsResult.rows) {
            if (!itemsByOrderId.has(item.order_id)) {
                itemsByOrderId.set(item.order_id, []);
            }
            itemsByOrderId.get(item.order_id)?.push({
                food_id: item.food_id,
                quantity: item.quantity,
                price_at_order: item.price_at_order,
            });
        }

        return orders.map(order => ({
            ...Order.fromRow(order),
            items: itemsByOrderId.get(order.id) || []
        }));
    }
}
