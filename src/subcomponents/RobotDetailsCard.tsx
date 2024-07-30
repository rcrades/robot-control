import React from 'react';
import { Robot } from '../types'; // Import Robot interface

interface RobotDetailsCardProps {
  robot: Robot;
  onDelete: (id: string) => void;
}

const RobotDetailsCard: React.FC<RobotDetailsCardProps> = ({ robot, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${robot.name}?`)) {
      onDelete(robot.id);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{robot.name}</h2>
      <p className="mb-2">Status: {robot.status}</p>
      <p className="mb-2">Battery: {robot.battery}%</p>
      <p className="mb-2">Model: {robot.model}</p>
      <p className="mb-2">Last Maintenance: {robot.lastMaintenance}</p>
      <p className="mb-2">Location: {robot.location.lat.toFixed(4)}, {robot.location.lng.toFixed(4)}</p>
      {robot.imageUrl && (
        <img src={robot.imageUrl} alt={`${robot.name} image`} className="w-32 h-32 object-cover rounded mt-4" />
      )}
      <div className="mt-4 flex space-x-2">
        <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RobotDetailsCard;