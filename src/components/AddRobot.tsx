import React, { useState } from 'react';
import { Robot } from '../types';

interface AddRobotProps {
  onSave: (newRobot: Omit<Robot, 'id'>) => void;
  onCancel: () => void;
}

const AddRobot: React.FC<AddRobotProps> = ({ onSave, onCancel }) => {
  const [newRobot, setNewRobot] = useState<Omit<Robot, 'id'>>({
    name: '',
    model: '',
    status: 'active',
    battery: 100,
    location: { lat: 0, lng: 0 },
    lastMaintenance: new Date().toISOString().split('T')[0],
    imageUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setNewRobot(prev => ({
        ...prev,
        location: { ...prev.location, [name]: parseFloat(value) }
      }));
    } else if (name === 'battery') {
      setNewRobot(prev => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setNewRobot(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newRobot);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Robot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input type="text" id="name" name="name" value={newRobot.name} onChange={handleInputChange} required className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label htmlFor="model" className="block mb-1">Model:</label>
          <input type="text" id="model" name="model" value={newRobot.model} onChange={handleInputChange} required className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label htmlFor="status" className="block mb-1">Status:</label>
          <select id="status" name="status" value={newRobot.status} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded">
            <option value="active">Active</option>
            <option value="charging">Charging</option>
            <option value="standby">Standby</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label htmlFor="battery" className="block mb-1">Battery (%):</label>
          <input type="number" id="battery" name="battery" value={newRobot.battery} onChange={handleInputChange} min="0" max="100" required className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label htmlFor="lat" className="block mb-1">Latitude:</label>
          <input type="number" id="lat" name="lat" value={newRobot.location.lat} onChange={handleInputChange} step="any" required className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label htmlFor="lng" className="block mb-1">Longitude:</label>
          <input type="number" id="lng" name="lng" value={newRobot.location.lng} onChange={handleInputChange} step="any" required className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label htmlFor="lastMaintenance" className="block mb-1">Last Maintenance:</label>
          <input type="date" id="lastMaintenance" name="lastMaintenance" value={newRobot.lastMaintenance} onChange={handleInputChange} required className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-1">Image URL:</label>
          <input type="url" id="imageUrl" name="imageUrl" value={newRobot.imageUrl} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddRobot;