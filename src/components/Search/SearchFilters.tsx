import React, { useState } from 'react';
import type { FilterOptions } from '../../interfaces/github.types';

interface SearchFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    minRepos: undefined,
    availableForHire: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const newValue = type === 'checkbox' 
      ? checked 
      : type === 'number' 
        ? value === '' ? undefined : Number(value)
        : value;

    const updatedFilters = {
      ...filters,
      [name]: newValue
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
      
      <div className="space-y-4">
        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location || ''}
            onChange={handleInputChange}
            placeholder="e.g., San Francisco"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Minimum Repositories Filter */}
        <div>
          <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Repositories
          </label>
          <input
            type="number"
            id="minRepos"
            name="minRepos"
            value={filters.minRepos || ''}
            onChange={handleInputChange}
            min="0"
            placeholder="e.g., 10"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Available for Hire Filter */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="availableForHire"
            name="availableForHire"
            checked={filters.availableForHire || false}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="availableForHire" className="ml-2 block text-sm text-gray-700">
            Available for Hire
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;