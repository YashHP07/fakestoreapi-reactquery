
"use client"; // Ensure this is a client component

import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';

interface CategoryFilterProps {
    onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ onSelectCategory }: CategoryFilterProps) {
    const { data: categories, isLoading, error } = useQuery<string[]>('categories', () =>
        fetcher('https://fakestoreapi.com/products/categories')
    );

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectCategory(event.target.value); // Pass the selected category to the parent
    };

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories.</div>;

    return (
        <select onChange={handleCategoryChange} className="border p-2">
            <option value="All">All</option>
            {categories?.map((category) => (
                <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize first letter */}
                </option>
            ))}
        </select>
    );
}