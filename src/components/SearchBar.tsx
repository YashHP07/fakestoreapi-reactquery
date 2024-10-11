

import { useState } from "react";
import { useQuery } from 'react-query';

// Fixed the types issue in product
interface Product {
  id: number;
  title: string;
  price: number;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Define a query to fetch products based on the current query
  const { data: products = [], isFetching } = useQuery(
    ["products", query],
    async () => {
      if (query.length > 0) {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data: Product[] = await response.json();
        // Filter products based on the query
        return data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      return []; // Return an empty array if the query is empty
    },
    {
      enabled: query.length > 0, // Only fetch when query has length
      staleTime: 30000, // Optional: cache for 30 seconds
    }
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query) {
      onSearch(query); // Trigger search on Enter key press
      setQuery(""); // Clear input field
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown} // Add onKeyDown event
        className="mt-16 w-1/2 max-w-md p-2 text-lg border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700  z-50"
      />
      {isFetching && <div>Loading...</div>}
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









