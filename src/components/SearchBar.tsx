"use client";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query) {
      onSearch(query); // Trigger search on Enter key press
      setProducts([]); // Clear suggestions
      setQuery(""); // Clear input field
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.length > 0) {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        // Filter products based on the query
        const filteredProducts = data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } else {
        setProducts([]);
      }
    };

    const debounceFetch = setTimeout(fetchProducts, 300); // Debounce to limit API calls

    return () => clearTimeout(debounceFetch); // Cleanup timeout on unmount
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown} // Add onKeyDown event
        className="w-1/2 max-w-md p-2 text-lg border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700"
      />
      {products.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded-lg shadow-lg">
          {products.map((product) => (
            <li key={product.id} className="p-2 border-b border-gray-200">
              {product.title} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
