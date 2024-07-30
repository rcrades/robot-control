import React from 'react';
import { Robot } from '../types';
import { FaBolt, FaCheck, FaPause, FaTools } from 'react-icons/fa';

interface RobotListCardProps {
  robot: Robot;
  onSelectRobot: (robot: Robot) => void;
}

const RobotListCard: React.FC<RobotListCardProps> = ({ robot, onSelectRobot }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'charging': return <FaBolt className="text-yellow-400" />;
      case 'active': return <FaCheck className="text-green-400" />;
      case 'standby': return <FaPause className="text-orange-400" />;
      case 'maintenance': return <FaTools className="text-red-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'bg-yellow-400';
      case 'active': return 'bg-green-400';
      case 'standby': return 'bg-orange-400';
      case 'maintenance': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <li
      className="mb-3 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition-colors duration-200"
      onClick={() => onSelectRobot(robot)}
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{robot.name}</h3>
        <p className="text-sm text-gray-400 mb-3">Model: {robot.model}</p>
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            {getStatusIcon(robot.status)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(robot.status)} text-gray-900`}>
            {robot.status}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400 text-gray-900">
            {robot.battery}%
          </span>
        </div>
      </div>
    </li>
  );
};

export default RobotListCard;