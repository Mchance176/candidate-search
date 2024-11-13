import React, { useState } from 'react';

interface SearchFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  minRepos?: number;
  minFollowers?: number;
  location?: string;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-4">Filter Candidates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Minimum Repositories
          </label>
          <input
            type="number"
            name="minRepos"
            min="0"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., 10"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Minimum Followers
          </label>
          <input
            type="number"
            name="minFollowers"
            min="0"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., 100"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., San Francisco"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters; 