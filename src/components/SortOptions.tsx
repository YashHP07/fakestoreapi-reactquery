interface SortOptionsProps {
    onSelectSortOption: (option: string) => void;
}

export default function SortOptions({ onSelectSortOption }: SortOptionsProps) {
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectSortOption(event.target.value); // Pass the selected sort option to the parent
    };

    return (
        <select onChange={handleSortChange} className="border p-2">
            <option value="price">Sort by Price</option>
            <option value="title">Sort by Title</option>
        </select>
    );
}