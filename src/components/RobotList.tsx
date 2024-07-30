import React, { useState } from 'react';
import RobotListCard from '../subcomponents/RobotListCard';
import { Robot } from '../types';
import { FaTimes } from 'react-icons/fa';

interface RobotListProps {
  onSelectRobot: (robot: Robot) => void;
  searchTerm: string;
  robots: Robot[];
  className?: string;
}

const statusColors = {
  charging: 'text-yellow-400 border-yellow-400',
  active: 'text-green-400 border-green-400',
  standby: 'text-orange-400 border-orange-400',
  maintenance: 'text-red-400 border-red-400',
};

const RobotList: React.FC<RobotListProps> = ({ onSelectRobot, searchTerm, robots, className }) => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredRobots = robots.filter(robot =>
    robot.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!statusFilter || robot.status === statusFilter)
  );

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status === statusFilter ? null : status);
  };

  const clearFilter = () => {
    setStatusFilter(null);
  };

  return (
    <div className={`w-80 bg-gray-900 text-white overflow-y-auto p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Robots</h2>
        <span className="text-sm text-gray-400">({filteredRobots.length})</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(statusColors).map(([status, color]) => (
          <button
            key={status}
            onClick={() => handleStatusFilter(status)}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              statusFilter === status ? color : 'text-gray-400 border-gray-600'
            } bg-gray-800 hover:bg-gray-700 transition-colors duration-200`}
          >
            {status}
          </button>
        ))}
        {statusFilter && (
          <button
            onClick={clearFilter}
            className="px-3 py-1 rounded-full text-xs font-medium border border-gray-600 text-gray-400 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex items-center"
          >
            Clear <FaTimes className="ml-1" />
          </button>
        )}
      </div>
      <ul>
        {filteredRobots.map((robot) => (
          <RobotListCard key={robot.id} robot={robot} onSelectRobot={onSelectRobot} />
        ))}
      </ul>
    </div>
  );
}

export default RobotList;