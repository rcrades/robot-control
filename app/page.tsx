"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeaderBar from '../src/components/HeaderBar';
import RobotList from '../src/components/RobotList';
import RobotDetails from '../src/components/RobotDetails';
import { Robot } from '@/types';

const Map = dynamic(() => import('../src/components/Map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const Home: React.FC = () => {
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [robots, setRobots] = useState<Robot[]>([]);
  const [isAddingRobot, setIsAddingRobot] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  const fetchRobots = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/robots');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRobots(data);
    } catch (error) {
      console.error('Error fetching robots:', error);
    }
  };

  useEffect(() => {
    fetchRobots();
  }, []);

  const handleSelectRobot = (robot: Robot) => {
    setSelectedRobot(robot);
    setSelectedLocation([robot.location.lat, robot.location.lng]);
    setIsAddingRobot(false);
  };

  const handleAddRobot = () => {
    setSelectedRobot(null);
    setSelectedLocation(null);
    setIsAddingRobot(true);
  };

  const handleSaveNewRobot = async (newRobot: Omit<Robot, 'id'>) => {
    console.log('Attempting to save new robot:', newRobot);
    try {
      const response = await fetch('http://localhost:3001/api/robots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRobot),
      });
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }
      const savedRobot = JSON.parse(responseText);
      console.log('Saved robot:', savedRobot);
      setRobots([...robots, savedRobot]);
      setIsAddingRobot(false);
      setSelectedRobot(null);
      setSelectedLocation(null);
    } catch (error) {
      console.error('Error saving new robot:', error);
    }
  };

  const handleCancelAddRobot = () => {
    setIsAddingRobot(false);
    setSelectedRobot(null);
    setSelectedLocation(null);
  };

  const handleDeleteRobot = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/robots/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRobots(robots.filter(robot => robot.id !== id));
      setSelectedRobot(null);
      setSelectedLocation(null);
    } catch (error) {
      console.error('Error deleting robot:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderBar onAddRobot={handleAddRobot} onSearch={setSearchTerm} />
      <div className="flex flex-1 overflow-hidden">
        <RobotList
          onSelectRobot={handleSelectRobot}
          searchTerm={searchTerm}
          robots={robots}
          className="w-1/4 z-10"
        />
        <div className="flex-1 relative z-0">
          <Map
            robots={robots}
            selectedRobot={selectedRobot}
            onSelectRobot={handleSelectRobot}
            selectedLocation={selectedLocation}
          />
        </div>
        <RobotDetails
          robot={selectedRobot}
          isAddingRobot={isAddingRobot}
          onSaveNewRobot={handleSaveNewRobot}
          onCancelAddRobot={() => setIsAddingRobot(false)}
          onDeleteRobot={handleDeleteRobot}
          className="w-1/4 z-10"
        />
      </div>
    </div>
  );
}

export default Home;