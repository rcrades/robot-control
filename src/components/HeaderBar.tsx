import React from 'react';
import { FaHome, FaPlus, FaSearch } from 'react-icons/fa';
import Search from '../subcomponents/Search';

interface HeaderBarProps {
  onAddRobot: () => void;
  onSearch: (term: string) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onAddRobot, onSearch }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-500 text-white p-4 z-20 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="text-2xl" 
            aria-label="Refresh Page" 
            onClick={handleRefresh}
          >
            <FaHome />
          </button>
          <h1 className="text-3xl font-extrabold tracking-wider font-orbitron">ROBOT CONTROL</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search onSearch={onSearch} />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={onAddRobot}
            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            aria-label="Add Robot"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;