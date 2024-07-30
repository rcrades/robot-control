import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from 'next';
import { Robot } from '../../src/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const robots = await kv.get<Robot[]>('robots');
    res.status(200).json(robots);
  } else if (req.method === 'POST') {
    const newRobot = req.body;
    const robots = await kv.get<Robot[]>('robots') || [];
    robots.push(newRobot);
    await kv.set('robots', robots);
    res.status(201).json(newRobot);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}