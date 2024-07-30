import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from 'next';
import { Robot } from '../../src/types';

async function getAllRobots(): Promise<Robot[]> {
  return await kv.get<Robot[]>('robots') || [];
}

async function getRobotById(id: string): Promise<Robot | undefined> {
  const robots = await getAllRobots();
  return robots.find(robot => robot.id === id);
}

async function addRobot(newRobot: Omit<Robot, 'id'>): Promise<Robot> {
  const robots = await getAllRobots();
  const highestId = robots.reduce((max, robot) => {
    const idNumber = parseInt(robot.id.slice(3));
    return idNumber > max ? idNumber : max;
  }, 0);
  const newId = `HRM${(highestId + 1).toString().padStart(3, '0')}`;
  const robotWithId = { id: newId, ...newRobot } as Robot;
  robots.push(robotWithId);
  await kv.set('robots', robots);
  return robotWithId;
}

async function updateRobot(id: string, updatedRobot: Partial<Robot>): Promise<Robot | null> {
  const robots = await getAllRobots();
  const index = robots.findIndex(robot => robot.id === id);
  if (index !== -1) {
    robots[index] = { ...robots[index], ...updatedRobot };
    await kv.set('robots', robots);
    return robots[index];
  }
  return null;
}

async function deleteRobot(id: string): Promise<boolean> {
  const robots = await getAllRobots();
  const filteredRobots = robots.filter(robot => robot.id !== id);
  if (filteredRobots.length < robots.length) {
    await kv.set('robots', filteredRobots);
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
          const robot = await getRobotById(req.query.id as string);
          if (robot) {
            res.status(200).json(robot);
          } else {
            res.status(404).json({ message: 'Robot not found' });
          }
        } else {
          const robots = await getAllRobots();
          res.status(200).json(robots);
        }
        break;
      case 'POST':
        const newRobot = await addRobot(req.body);
        res.status(201).json(newRobot);
        break;
      case 'PUT':
        if (req.query.id) {
          const updatedRobot = await updateRobot(req.query.id as string, req.body);
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
          const deleted = await deleteRobot(req.query.id as string);
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