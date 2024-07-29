import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Robot } from '../types'; // Import Robot interface

interface MapProps {
  robots: Robot[];
  onSelectRobot: (robot: Robot) => void;
  selectedLocation: [number, number] | null;
  selectedRobot: Robot | null;
}

const Map: React.FC<MapProps> = ({ robots, onSelectRobot, selectedLocation, selectedRobot }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([41.8781, -87.6298], 13); // Center map on initial coordinates
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    if (mapRef.current) {
      // Clear existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current!.removeLayer(layer);
        }
      });

      // Custom icon
      const robotIcon = L.icon({
        iconUrl: '/robot-pin.svg', // Make sure to add this image to your public folder
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const activeIcon = L.icon({
        iconUrl: '/robot-pin-active.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      robots.forEach(robot => {
        const marker = L.marker([robot.location.lat, robot.location.lng], { icon: robot.id === selectedRobot?.id ? activeIcon : robotIcon })
          .addTo(mapRef.current!)
          .bindPopup(`<b>${robot.name}</b><br>${robot.status}`);

        marker.on('click', () => {
          marker.openPopup();
          onSelectRobot(robot);
        });
      });
    }
  }, [robots, onSelectRobot, selectedRobot]);

  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.setView(selectedLocation, 13);
    }
  }, [selectedLocation]);

  return <div ref={mapContainerRef} className="w-full h-[calc(100vh-4rem)]" />;
};

export default Map;