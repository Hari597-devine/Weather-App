import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RadarMap({ lat, lon }) {
  return (
    <div className="map glass">
      <MapContainer center={[lat, lon]} zoom={6}>
        
        {/* Base Map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* WEATHER RADAR */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY`}
        />

      </MapContainer>
    </div>
  );
}