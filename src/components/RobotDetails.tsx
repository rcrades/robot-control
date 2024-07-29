import React from 'react';
import RobotDetailsCard from '../subcomponents/RobotDetailsCard';
import RobotNotSelected from '../subcomponents/RobotNotSelected';
import AddRobot from './AddRobot';
import { Robot } from '../types';

interface RobotDetailsProps {
  robot: Robot | null;
  isAddingRobot: boolean;
  onSaveNewRobot: (newRobot: Omit<Robot, 'id'>) => void;
  onCancelAddRobot: () => void;
  onDeleteRobot: (id: string) => void;
  className?: string;
}

const RobotDetails: React.FC<RobotDetailsProps> = ({ 
  robot, 
  isAddingRobot, 
  onSaveNewRobot, 
  onCancelAddRobot,
  onDeleteRobot,
  className 
}) => {
  return (
    <div className={`w-1/4 bg-gray-700 text-white p-4 overflow-y-auto ${className}`}>
      {isAddingRobot ? (
        <AddRobot onSave={onSaveNewRobot} onCancel={onCancelAddRobot} />
      ) : robot ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{robot.name}</h2>
          <RobotDetailsCard robot={robot} onDelete={onDeleteRobot} />
        </>
      ) : (
        <RobotNotSelected />
      )}
    </div>
  );
};

export default RobotDetails;