import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

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
    <div className="relative">
      <input
        type="text"
        placeholder="Search robots..."
        className="w-64 pl-10 pr-8 py-2 bg-purple-800 text-white placeholder-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && (
        <button
          aria-label="Clear Search"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
          onClick={handleClearSearch}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default Search;