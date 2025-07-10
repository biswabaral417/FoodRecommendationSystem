
type createOrderPayload =
    {
        items: orderItems[]
    }
type orderItems = {
    "food_id": number,
    "quantity": number,
        price_at_order: number;

}
type Order = {
    id: number;
    orderedAt: string;
    items: orderItems[];
    status: string;
    totalPrice: number;

}