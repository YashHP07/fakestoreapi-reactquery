// src/components/CartPage.tsx
import { ChangeEvent } from "react";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import { useState } from "react";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// fixed handlesubmitproblem
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submission logic here (e.g., API call)
    alert("Thank you for your purchase!");
    setModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl transform transition-transform hover:scale-105">
      <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>
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
            <h3 className="text-lg font-bold">
              Total: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h3>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 w-full p-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Checkout
          </button>
        </>
      )}

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
