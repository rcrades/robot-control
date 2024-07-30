import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env.development.local') });

import { kv } from "@vercel/kv";
import fs from 'fs/promises';

async function initKV() {
  const dataPath = path.join(__dirname, '..', 'public', 'data', 'robot_assets.json');
  const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
  await kv.set('robots', data.robots);
  console.log('KV database initialized with robot data');
}

initKV().catch(console.error);