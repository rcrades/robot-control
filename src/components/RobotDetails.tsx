import React, { useState } from 'react';
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
  onUpdateRobot: (updatedRobot: Robot) => void;
  className?: string;
}

const RobotDetails: React.FC<RobotDetailsProps> = ({ 
  robot, 
  isAddingRobot, 
  onSaveNewRobot, 
  onCancelAddRobot,
  onDeleteRobot,
  onUpdateRobot,
  className 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRobot, setEditedRobot] = useState<Robot | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedRobot(robot);
  };

  const handleSave = () => {
    if (editedRobot) {
      onUpdateRobot(editedRobot);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRobot(null);
  };

  const handleChange = (updatedRobot: Robot) => {
    setEditedRobot(updatedRobot);
  };

  return (
    <div className={`w-1/4 bg-gray-700 text-white p-4 overflow-y-auto ${className}`}>
      {isAddingRobot ? (
        <AddRobot onSave={onSaveNewRobot} onCancel={onCancelAddRobot} />
      ) : robot ? (
        <RobotDetailsCard 
          robot={isEditing ? editedRobot! : robot} 
          onDelete={onDeleteRobot}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={handleChange}
        />
      ) : (
        <RobotNotSelected />
      )}
    </div>
  );
};

export default RobotDetails;