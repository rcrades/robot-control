import React from 'react';
import { Robot } from '../types';

interface RobotDetailsCardProps {
  robot: Robot;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (updatedRobot: Robot) => void;
}

const RobotDetailsCard: React.FC<RobotDetailsCardProps> = ({
  robot,
  onDelete,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'location.lat' || name === 'location.lng') {
      const [parent, child] = name.split('.');
      onChange({
        ...robot,
        location: {
          ...robot.location,
          [child]: parseFloat(value)
        }
      });
    } else if (name === 'battery') {
      onChange({ ...robot, battery: parseInt(value) });
    } else {
      onChange({ ...robot, [name as keyof Robot]: value });
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Robot' : robot.name}</h2>
      {isEditing ? (
        <>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">Name:</label>
            <input
              name="name"
              value={robot.name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">Status:</label>
            <select
              name="status"
              value={robot.status}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="charging">Charging</option>
              <option value="active">Active</option>
              <option value="standby">Standby</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">Battery:</label>
            <input
              name="battery"
              type="number"
              value={robot.battery}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">Model:</label>
            <input
              name="model"
              value={robot.model}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">Last Maintenance:</label>
            <input
              name="lastMaintenance"
              type="date"
              value={robot.lastMaintenance}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">Location:</label>
            <div className="flex space-x-2">
              <input
                name="location.lat"
                type="number"
                value={robot.location.lat}
                onChange={handleInputChange}
                className="w-1/2 bg-gray-700 text-white p-2 rounded"
                placeholder="Latitude"
              />
              <input
                name="location.lng"
                type="number"
                value={robot.location.lng}
                onChange={handleInputChange}
                className="w-1/2 bg-gray-700 text-white p-2 rounded"
                placeholder="Longitude"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
            <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2">Status: {robot.status}</p>
          <p className="mb-2">Battery: {robot.battery}%</p>
          <p className="mb-2">Model: {robot.model}</p>
          <p className="mb-2">Last Maintenance: {robot.lastMaintenance}</p>
          <p className="mb-2">Location: {robot.location.lat.toFixed(4)}, {robot.location.lng.toFixed(4)}</p>
          {robot.imageUrl && (
            <img src={robot.imageUrl} alt={`${robot.name} image`} className="w-32 h-32 object-cover rounded mt-4" />
          )}
          <div className="mt-4 flex space-x-2">
            <button onClick={onEdit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit
            </button>
            <button
              onClick={() => onDelete(robot.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RobotDetailsCard;