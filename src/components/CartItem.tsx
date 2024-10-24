
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
    <div className="flex items-start p-4 border-b border-gray-200">
      {/* Image Section */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-md shadow-md"
        />
        {/* Quantity Controls and Trash Icon Below Image */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded flex items-center"
          >
            <FaMinus />
          </button>
          <span className="text-lg font-semibold">{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.id)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded flex items-center"
          >
            <FaPlus />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded mt-2"
        >
          <FaTrash />
        </button>
      </div>

      {/* Product Title */}
      <div className="ml-6 flex-1">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600 mt-1">₹{item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}












