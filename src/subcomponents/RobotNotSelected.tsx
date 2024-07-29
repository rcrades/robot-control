import React from 'react';

const RobotNotSelected: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">No Robot Selected</h2>
      <p className="text-gray-300">
        Please select a robot from the list or from the map to view its details.
      </p>
    </div>
  );
};

export default RobotNotSelected;
