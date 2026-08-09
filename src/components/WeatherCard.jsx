import { motion } from "framer-motion";

export default function WeatherCard({ data, unit }) {
  return (
    <motion.div
      className="card glass"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      />

      <h1>
        {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
      </h1>

      <p>{data.weather[0].description}</p>

      <div className="details">
        <span>Humidity: {data.main.humidity}%</span>
        <span>Wind: {data.wind.speed}</span>
      </div>
    </motion.div>
  );
}