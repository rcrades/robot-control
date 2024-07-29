import React from 'react';

interface Robot {
  id: string;
  name: string;
  status: string;
  battery: number;
  model: string;
  lastMaintenance: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface RobotMapCardProps {
  robot: Robot;
}

const RobotMapCard: React.FC<RobotMapCardProps> = ({ robot }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{robot.name}</h2>
      <p>Status: {robot.status}</p>
      <p>Battery: {robot.battery}%</p>
      <p>Model: {robot.model}</p>
      <p>Last Maintenance: {robot.lastMaintenance}</p>
      <img src={robot.imageUrl} alt="Robot Image" className="w-24 h-24 rounded mt-4" />
    </div>
  );
};

export default RobotMapCard;
