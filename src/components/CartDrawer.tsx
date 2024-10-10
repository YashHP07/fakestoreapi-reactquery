
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';

export default function CartPage() {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/128/11329/11329060.png" 
                        alt="Empty Cart" 
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <p className="text-lg font-medium text-gray-500">Your cart is empty.</p>
                </div>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200">
                        {cart.map((item) => (
                            <li key={item.id} className="py-6">
                                <CartItem
                                    item={item}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    removeFromCart={removeFromCart}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mt-6 border-t pt-4">
                        <h3 className="text-2xl font-bold text-gray-800">
                            Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </h3>
                        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

