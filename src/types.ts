export interface Robot {
  id: string;
  name: string;
  model: string;
  status: string;
  battery: number;
  location: {
    lat: number;
    lng: number;
  };
  lastMaintenance: string;
  imageUrl?: string;
}