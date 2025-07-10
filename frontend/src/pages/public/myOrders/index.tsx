import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../../Api/order/getAllorders';

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllOrders();
        setOrders(data.orders || []);
        console.log('Orders loaded:', data.orders);
      } catch (err) {
        console.error('Failed to load orders:', err);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-6 border p-4 rounded-lg shadow-sm">
            <div className="mb-2 text-sm text-gray-500">
              <strong>Order ID:</strong> {order.id} |{' '}
              <strong>Date:</strong> {new Date(order.orderedAt).toLocaleString()} |{' '}
              <strong>Status:</strong> {order.status}
            </div>

            {order.items.length === 0 ? (
              <p className="text-gray-400 italic">No items in this order.</p>
            ) : (
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Food ID #{item.food_id}</span> x {item.quantity}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      Rs. {item.price_at_order * item.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
