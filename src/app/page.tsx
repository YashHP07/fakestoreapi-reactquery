"use client"
import { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortOptions from '../components/SortOptions';

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOption, setSortOption] = useState('price');

    return (
        <div className="container mx-auto p-4">
            <SearchBar onSearch={setSearchQuery} />
            <div className="flex justify-between items-center my-4">
                <CategoryFilter onSelectCategory={setSelectedCategory} />
                <SortOptions onSelectSortOption={setSortOption} />
            </div>
            <ProductList 
                searchQuery={searchQuery} 
                selectedCategory={selectedCategory} 
                sortOption={sortOption} 
            />
        </div>
    );
}
