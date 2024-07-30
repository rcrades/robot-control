import React from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';

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
          <button
            onClick={onAddRobot}
            className="bg-white text-purple-600 p-2 rounded-full hover:bg-purple-100 transition-colors"
            aria-label="Add Robot"
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <input
            type="text"
            placeholder="Search robots..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full p-2 rounded bg-white text-gray-800 placeholder-gray-500"
          />
        </div>
        <button className="text-2xl">☰</button>
      </div>
    </header>
  );
};

export default HeaderBar;