
import { ChangeEvent } from "react";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import { useState } from "react";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  // Dynamic price details (initial values as 0)
  const totalPrice = cart.length > 0 ? cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
  const discount = cart.length > 0 ? 0.1 * totalPrice : 0; // Example: 10% discount if cart has items
  const platformFee = cart.length > 0 ? 3 : 0; // Platform fee is applicable only if there are items
  const deliveryCharges = cart.length > 0 && totalPrice > 500 ? 0 : cart.length > 0 ? 50 : 0; // Delivery charges based on total price
  const totalAmount = cart.length > 0 ? totalPrice - discount + platformFee + deliveryCharges : 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your purchase!");
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-6 bg-gray-50">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 p-4 bg-white shadow-md rounded-lg mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">
            <span className="inline-block mb-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/11329/11329060.png"
                alt="Empty Cart"
                className="w-12 h-12 mx-auto"
              />
            </span>
            Your cart is empty.
          </p>
        ) : (
          <>
            <ul className="divide-y divide-gray-300">
              {cart.map((item) => (
                <li key={item.id} className="py-4">
                  <CartItem
                    item={item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    removeFromCart={removeFromCart}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full p-3 text-white bg-orange-600 rounded-lg shadow hover:bg-orange-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right Section: Price Details */}
      <div className="ml-4 w-full lg:w-1/3 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-4">PRICE DETAILS</h3>
        <div className="flex justify-between">
          <span>Price ({cart.length} item{cart.length > 1 ? "s" : ""})</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className={`flex justify-between ${discount > 0 ? "text-green-600" : ""}`}>
          <span>Discount</span>
          <span>- ₹{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹{platformFee}</span>
        </div>
        <div className={`flex justify-between ${deliveryCharges === 0 ? "line-through text-gray-400" : ""}`}>
          <span>Delivery Charges</span>
          <span>₹{deliveryCharges}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total Amount</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        {cart.length > 0 && (
          <p className="text-green-600 text-sm mt-2">
            You will save ₹{discount.toFixed(2)} on this order
          </p>
        )}
      </div>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Checkout</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Payment Method:</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


