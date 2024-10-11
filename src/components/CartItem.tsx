
// src/components/CartItem.tsx
import { Product } from "../types/Product";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

interface CartItemProps {
  item: Product & { quantity: number };
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: CartItemProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        {/* Image Section */}
        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
        <h3 className="text-lg font-semibold">{item.title}</h3>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded flex items-center"
        >
          <FaMinus />
        </button>
        <span className="text-lg">{item.quantity}</span>
        <button
          onClick={() => increaseQuantity(item.id)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded flex items-center"
        >
          <FaPlus />
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
      >
        <FaTrash />
      </button>
    </div>
  );
}

