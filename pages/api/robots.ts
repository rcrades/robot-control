import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'public', 'data', 'robot_assets.json');

let robots: any[] = [];

function loadRobots() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(data);
    robots = Array.isArray(parsedData.robots) ? parsedData.robots : [];
  } catch (err) {
    console.error('Error reading or parsing file:', err);
    robots = [];
  }
}

function getAllRobots() {
  loadRobots();
  return robots;
}

function getRobotById(id: string) {
  const robots = getAllRobots();
  console.log('Looking for robot with id:', id);
  console.log('Available robots:', robots);
  const robot = robots.find(robot => robot.id === id);
  console.log('Found robot:', robot);
  return robot;
}

function addRobot(newRobot: any) {
  console.log('Adding new robot:', newRobot);
  loadRobots(); // Ensure we have the latest data
  console.log('Robots before adding:', robots);
  if (!Array.isArray(robots)) {
    console.error('robots is not an array, initializing it');
    robots = [];
  }
  
  const highestId = robots.reduce((max, robot) => {
    const idNumber = parseInt(robot.id.slice(3));
    return idNumber > max ? idNumber : max;
  }, 0);
  const newId = `HRM${(highestId + 1).toString().padStart(3, '0')}`;
  const robotWithId = { id: newId, ...newRobot };
  robots.push(robotWithId);
  console.log('Robots after adding:', robots);
  fs.writeFileSync(dataPath, JSON.stringify({ robots }, null, 2));
  return robotWithId;
}

function updateRobot(id: string, updatedRobot: any) {
  const robots = getAllRobots();
  const index = robots.findIndex(robot => robot.id === id);
  if (index !== -1) {
    robots[index] = { ...robots[index], ...updatedRobot };
    fs.writeFileSync(dataPath, JSON.stringify({ robots }, null, 2));
    return robots[index];
  }
  return null;
}

function deleteRobot(id: string) {
  const robots = getAllRobots();
  const filteredRobots = robots.filter(robot => robot.id !== id);
  if (filteredRobots.length < robots.length) {
    fs.writeFileSync(dataPath, JSON.stringify({ robots: filteredRobots }, null, 2));
    return true;
  }
  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const robot = getRobotById(req.query.id as string);
          if (robot) {
            res.status(200).json(robot);
          } else {
            res.status(404).json({ message: 'Robot not found' });
          }
        } else {
          const robots = getAllRobots();
          res.status(200).json(robots);
        }
        break;
      case 'POST':
        console.log('Received POST request with body:', req.body);
        const newRobot = addRobot(req.body);
        console.log('New robot added:', newRobot);
        res.status(201).json(newRobot);
        break;
      case 'PUT':
        if (req.query.id) {
          const updatedRobot = updateRobot(req.query.id as string, req.body);
          if (updatedRobot) {
            res.status(200).json(updatedRobot);
          } else {
            res.status(404).json({ message: 'Robot not found' });
          }
        } else {
          res.status(400).json({ message: 'Robot ID is required' });
        }
        break;
      case 'DELETE':
        if (req.query.id) {
          const deleted = deleteRobot(req.query.id as string);
          if (deleted) {
            res.status(204).end();
          } else {
            res.status(404).json({ message: 'Robot not found' });
          }
        } else {
          res.status(400).json({ message: 'Robot ID is required' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}