import { Minus, Plus } from "lucide-react";
import LazyImage from "../../../../core/components/atoms/lazyImage/LazyImage";
import { useCart } from "../../../../Providers/CartProvider";
interface FoodCardProps {
  food: Food;
  isLoading: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, isLoading }) => {
  const { cart, subCart, addCart } = useCart()

  const AddToCartCount: React.FC<{ id: number }> = ({ id }) => {
    const existingFood = cart.find((item) => item.id === id);
    if (!existingFood || existingFood.count === 0) {
      return (
        <button
          className="bg-blue text-xl text-white w-full h-[40px]"
          onClick={() => addCart(id)}
        >
          add to cart
        </button>
      );
    }

    return (
      <div className="w-full flex bg-blue-700 align-center rounded-lg justify-between gap-2">
        <button
          className="w-fit cursor-pointer hover:bg-green-600 bg-blue-600 text-white p-2 rounded-lg"
          onClick={() => addCart(id)}
        >
          <Plus />
        </button>
        <div className="flex items-center text-xl mt-1 flex-col text-white">{existingFood.count}</div>
        <button
          className="w-fit cursor-pointer hover:bg-green-600 bg-blue-600 text-white p-2 rounded-lg"
          onClick={() => subCart(id)}
        >
          <Minus />
        </button>
      </div>
    );
  };

  return (
    <div className="p-2 rounded border border-gray-200 min-w-[250px] max-w-[400px] shadow-lg w-56 h-fit">
      <LazyImage
        src={isLoading ? "a" : food.imageUrl}
        className="w-full h-40 border-none bg-gray-200 object-cover animate-pulse"
        alt=""
      />
      <div className="mt-2 flex justify-between p-2">
        <p>{isLoading ? "..." : food.name}</p>
        <p>{isLoading ? "..." : `${food.price} RS`}</p>
      </div>
      <div className="flex bg-blue-700 align-center rounded-lg justify-between gap-2">
        <AddToCartCount id={food.id} />
      </div>
    </div>
  );
};


export default FoodCard