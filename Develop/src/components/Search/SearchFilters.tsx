interface SearchFiltersProps {
    onFilterChange: (filters: {
      minRepos?: number;
      minFollowers?: number;
      location?: string;
    }) => void;
  }
  
  const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onFilterChange({
        minRepos: formData.get('minRepos') ? Number(formData.get('minRepos')) : undefined,
        minFollowers: formData.get('minFollowers') ? Number(formData.get('minFollowers')) : undefined,
        location: formData.get('location')?.toString() || undefined,
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
              Min Repositories
            </label>
            <input
              type="number"
              name="minRepos"
              id="minRepos"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="minFollowers" className="block text-sm font-medium text-gray-700">
              Min Followers
            </label>
            <input
              type="number"
              name="minFollowers"
              id="minFollowers"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </form>
    );
  };
  
  export default SearchFilters;