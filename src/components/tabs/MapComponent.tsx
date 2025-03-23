import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface MapProps {
  start?: [number, number];
  end?: [number, number];
  busStops?: [number, number][];
}

const MapComponent: React.FC<MapProps> = ({ start, end, busStops = [] }) => {


  return (
    <div className="relative w-full h-96 rounded-lg shadow-md overflow-hidden">
      <MapContainer>
        
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {start && (
          <Marker position={start}>
            <Popup>Start: {start.toString()}</Popup>
          </Marker>
        )}

        {end && (
          <Marker position={end}>
            <Popup>End: {end.toString()}</Popup>
          </Marker>
        )}

        {busStops.map((stop, index) => (
          <Marker key={index} position={stop}>
            <Popup>Bus Stop {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
