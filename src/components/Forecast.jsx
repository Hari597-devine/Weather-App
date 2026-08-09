export default function Forecast({ data, unit }) {
  if (!data) return null;

  return (
    <div className="forecast">
      {data.list.slice(0, 8).map((item, i) => (
        <div key={i} className="forecast-card glass">
          <p>{new Date(item.dt * 1000).getHours()}:00</p>

          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt={item.weather[0].description || "weather condition"}
          />

          <p>
            {Math.round(item.main.temp)}°{unit === "metric" ? "C" : "F"}
          </p>
        </div>
      ))}
    </div>
  );
}