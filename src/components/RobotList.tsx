import React from 'react';
import RobotListCard from '../subcomponents/RobotListCard';
import { Robot } from '../types';

interface RobotListProps {
  onSelectRobot: (robot: Robot) => void;
  searchTerm: string;
  robots: Robot[];
  className?: string;
}

const RobotList: React.FC<RobotListProps> = ({ onSelectRobot, searchTerm, robots, className }) => {
  console.log('Robots in RobotList:', robots);
  const filteredRobots = robots.filter(robot =>
    robot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`w-80 bg-gray-900 text-white overflow-y-auto p-4 ${className}`}>
      <h2 className="text-xl font-bold mb-4">Robots ({filteredRobots.length})</h2>
      <ul>
        {filteredRobots.map((robot) => (
          <RobotListCard key={robot.id} robot={robot} onSelectRobot={onSelectRobot} />
        ))}
      </ul>
    </div>
  );
}

export default RobotList;