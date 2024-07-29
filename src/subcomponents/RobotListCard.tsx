import React from 'react';
import { Robot } from '../types'; // Import Robot interface

interface RobotListCardProps {
  robot: Robot;
  onSelectRobot: (robot: Robot) => void;
}

const RobotListCard: React.FC<RobotListCardProps> = ({ robot, onSelectRobot }) => {
  console.log('Rendering RobotListCard for:', robot.name);
  return (
    <li
      className="p-2 mb-2 bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
      onClick={() => onSelectRobot(robot)}
    >
      {robot.name} - {robot.status} - Battery: {robot.battery}%
    </li>
  );
};

export default RobotListCard;