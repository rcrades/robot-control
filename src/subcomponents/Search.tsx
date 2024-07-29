import React, { useState } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    onSearch(newTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search robots..."
        className="w-full p-2 pr-8 rounded"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && (
        <button
          aria-label="Clear Search"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center"
          onClick={handleClearSearch}
        >
          <span className="text-sm">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Search;