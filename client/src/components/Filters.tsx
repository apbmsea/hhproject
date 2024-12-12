// Filters.tsx
import React from 'react';

interface FiltersProps {
    searchQuery: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({ searchQuery, onSearch }) => {
    return (
        <aside className="filters">
            <h2>Фильтры</h2>
            <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={onSearch}
            />
        </aside>
    );
};

export default Filters;
