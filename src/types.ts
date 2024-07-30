export interface Robot {
  id: string;
  name: string;
  model: string;
  status: 'charging' | 'active' | 'standby' | 'maintenance';
  battery: number;
  location: {
    lat: number;
    lng: number;
  };
  lastMaintenance: string;
  imageUrl?: string;
}