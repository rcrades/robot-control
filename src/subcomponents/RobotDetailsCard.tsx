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
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Delete Robot
      </button>
    </div>
  );
};

export default RobotDetailsCard;