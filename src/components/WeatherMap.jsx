import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Smoothly animates the map to a new center instead of snapping instantly.
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), {
      duration: 1.5, // seconds - higher = slower/smoother
      easeLinearity: 0.25,
    });
  }, [center, map]);
  return null;
}

export default function WeatherMap({ lat, lon, city, onLocationChange }) {
  const position = [lat, lon];
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker && onLocationChange) {
        const { lat: newLat, lng: newLon } = marker.getLatLng();
        onLocationChange(newLat, newLon);
      }
    },
  };

  return (
    <div className="map glass">
      <MapContainer center={position} zoom={8} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <ChangeView center={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          draggable={true}
          eventHandlers={eventHandlers}
          ref={markerRef}
        >
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
      <p className="map-hint">Drag the pin to check weather anywhere</p>
    </div>
  );
}
