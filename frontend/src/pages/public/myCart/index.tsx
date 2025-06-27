import React from 'react';
import { useLocalStorage } from '../../../utils/customhooks/useLocalStorage';
import { useAllFoods } from '../../../Api/admin/useAllFoods';

const MyCart = () => {
  const [cart] = useLocalStorage<{ id: number; count: number }[]>("cart", []);
  const { isLoading, error, data: foods } = useAllFoods();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  const cartItems = foods?.filter((food: any) =>
    cart.some(cartItem => cartItem.id === food.id)
  );

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
          {cartItems?.map((food: any, index: number) => {
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
        </tbody>
      </table>
      <div className='w-full flex justify-center p-2'>

      <button className='p-2 bg-blue-500 hover:bg-green-500 rounded px-6 cursor-pointer'>Order</button>
      </div>
    </div>
  );
};

export default MyCart;
