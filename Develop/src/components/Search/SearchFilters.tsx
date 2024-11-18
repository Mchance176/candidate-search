import { useState } from 'react';
import type { FilterOptions } from '../../interfaces/github.types';

const SearchFilters = ({ onFilterChange }: { onFilterChange: (filters: FilterOptions) => void }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    minRepos: 0,
    minFollowers: 0,
    location: '',
    language: '',
    availableForHire: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
    
    const updatedFilters = {
      ...filters,
      [name]: newValue
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold mb-4">Filter Candidates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Repositories
            <input
              type="number"
              name="minRepos"
              value={filters.minRepos}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Followers
            <input
              type="number"
              name="minFollowers"
              value={filters.minFollowers}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., San Francisco"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Language
            <input
              type="text"
              name="language"
              value={filters.language}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., JavaScript"
            />
          </label>
        </div>

        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availableForHire"
              checked={filters.availableForHire}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Available for Hire</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;