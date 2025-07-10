import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../../utils/customhooks/useLocalStorage';
import { useAllFoods } from '../../../Api/admin/useAllFoods';
import { create_order } from '../../../Api/order/createOrder';

const MyCart:React.FC<{}> = () => {
  const [cart, setCart] = useLocalStorage<{ id: number; count: number }[]>("cart", []);
  const { isLoading, error, data: foods } = useAllFoods();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    if (foods) {
      const items = foods.filter((food: any) =>
        cart.some(cartItem => cartItem.id === food.id)
      );
      setCartItems(items);
    }
  }, [foods, cart]);

  const totalAmount = cartItems.reduce((sum, food: any) => {
    const quantity = cart.find(item => item.id === food.id)?.count || 0;
    return sum + food.price * quantity;
  }, 0);

  const handleCreateOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const items = cartItems.map((food: any) => {
      const cartItem = cart.find(item => item.id === food.id);
      return {
        food_id: food.id,
        quantity: cartItem?.count || 1
      };
    });

    try {
      const response = await create_order({ items });
      alert("Order placed successfully!");
      console.log(response);
      setCart([]);
      setCartItems([]);
    } catch (err) {
      alert("Failed to place order.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">SN</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((food: any, index: number) => {
            const cartItem = cart.find(item => item.id === food.id);
            const quantity = cartItem?.count || 0;
            const total = quantity * food.price;

            return (
              <tr key={food.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{food.name}</td>
                <td className="border px-4 py-2">{food.price} Rs</td>
                <td className="border px-4 py-2">{quantity}</td>
                <td className="border px-4 py-2">{total} Rs</td>
              </tr>
            );
          })}
          <tr className="bg-gray-100 font-semibold">
            <td colSpan={4} className="border px-4 py-2 text-right">Total Amount:</td>
            <td className="border px-4 py-2">{totalAmount} Rs</td>
          </tr>
        </tbody>
      </table>
      <div className='w-full flex justify-center p-4'>
        <button
          className='p-2 bg-blue-500 hover:bg-green-500 rounded px-6 cursor-pointer text-white'
          onClick={handleCreateOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default MyCart;
