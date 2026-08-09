export default function CloudLayer({ lat, lon }) {
  const zoom = 5;

  // Converts Longitude to Tile X coordinate
  const lon2tile = (longitude, z) =>
    Math.floor(((longitude + 180) / 360) * Math.pow(2, z));

  // Converts Latitude to Tile Y coordinate
  const lat2tile = (latitude, z) =>
    Math.floor(
      ((1 -
        Math.log(
          Math.tan((latitude * Math.PI) / 180) +
            1 / Math.cos((latitude * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
        Math.pow(2, z)
    );

  const x = lon2tile(lon, zoom);
  const y = lat2tile(lat, zoom);
  const apiKey = import.meta.env.VITE_OWM_API_KEY || "YOUR_API_KEY";

  return (
    <div className="cloud-layer">
      <img
        src={`https://tile.openweathermap.org/map/clouds_new/${zoom}/${x}/${y}.png?appid=${apiKey}`}
        alt="clouds layer"
      />
    </div>
  );
}