



"use client"; // Add this line to indicate this is a client component

import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';

interface ProductListProps {
    searchQuery: string;
    selectedCategory: string;
    sortOption: string;
}

export default function ProductList({ searchQuery, selectedCategory, sortOption }: ProductListProps) {
    const { data, isLoading, error } = useQuery<Product[]>('products', () =>
        fetcher('https://fakestoreapi.com/products')
    );

    if (isLoading) return <div className="text-center text-xl font-bold animate-pulse">Loading...</div>;
    if (error) return <div className="text-center text-red-600 text-xl">Error loading products.</div>;

    // Filter products based on search query and selected category
    const filteredProducts = data?.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sort products based on the selected sorting option
    const sortedProducts = filteredProducts?.sort((a, b) => {
        if (sortOption === 'price') {
            return a.price - b.price;
        } else if (sortOption === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    return (
        <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
