import { useEffect, useState } from "react";
import {
  getWeather,
  getForecast,
  getAirQuality,
  getWeatherByCoords,
  getForecastByCoords,
} from "../services/weatherService";

import Sky from "../components/Sky";
import WeatherParticles from "../components/WeatherParticles";
import HourlyForecast from "../components/HourlyForecast";
import WeatherSummary from "../components/WeatherSummary";
import AirQuality from "../components/AirQuality";
import SunCycle from "../components/SunCycle";
import WeatherMap from "../components/WeatherMap";
import UVIndex from "../components/UVIndex";
import MoonPhase from "../components/MoonPhase";
import Logo from "../components/Logo";
import Lightning from "../components/Lightning";
import ClimateVibe from "../components/ClimateVibe";

const CITIES = ["Kathmandu", "Birgunj", "Patan", "New York", "Tokyo", "Paris", "Sydney", "Mumbai", "Cairo", "London"];

export default function Home({ unit }) {
  const [city, setCity] = useState("Kathmandu");
  const [searchInput, setSearchInput] = useState("Kathmandu");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [air, setAir] = useState(null);
  const [uv, setUV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState(null); // { lat, lon } when browsing by location/drag

  const fetchData = async (targetCity) => {
    if (!targetCity || !targetCity.trim()) return;
    try {
      setLoading(true);
      setError(null);

      const weatherData = await getWeather(targetCity, unit);
      setWeather(weatherData);
      setCity(weatherData.name);
      setSearchInput(weatherData.name);
      setCoords(null);

      const { lat, lon } = weatherData.coord;

      const [forecastData, airData] = await Promise.all([
        getForecast(targetCity, unit).catch((err) => {
          console.error("Failed to fetch forecast:", err);
          return null;
        }),
        getAirQuality(lat, lon).catch((err) => {
          console.error("Failed to fetch air quality:", err);
          return null;
        }),
      ]);

      setForecast(forecastData);
      setAir(airData);
      setUV({ value: Math.floor(Math.random() * 11) });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data. Please check the city name or your connection.");
      setLoading(false);
    }
  };

  const fetchDataByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      const weatherData = await getWeatherByCoords(lat, lon, unit);
      setWeather(weatherData);
      setCity(weatherData.name || "Selected Location");
      setSearchInput(weatherData.name || "Selected Location");
      setCoords({ lat, lon });

      const [forecastData, airData] = await Promise.all([
        getForecastByCoords(lat, lon, unit).catch((err) => {
          console.error("Failed to fetch forecast:", err);
          return null;
        }),
        getAirQuality(lat, lon).catch((err) => {
          console.error("Failed to fetch air quality:", err);
          return null;
        }),
      ]);

      setForecast(forecastData);
      setAir(airData);
      setUV({ value: Math.floor(Math.random() * 11) });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data for that location.");
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchDataByCoords(latitude, longitude).finally(() => setLocating(false));
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Couldn't get your location. Please allow location access and try again.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleMapLocationChange = (lat, lon) => {
    fetchDataByCoords(lat, lon);
  };

  useEffect(() => {
    if (coords) {
      fetchDataByCoords(coords.lat, coords.lon);
    } else {
      fetchData(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, unit]);

  const getWeatherClass = () => {
    if (!weather) return "climate-clear";
    const main = weather.weather[0].main.toLowerCase();
    if (main === "snow") return "climate-snow";
    if (["rain", "drizzle"].includes(main)) return "climate-rain";
    if (main === "thunderstorm") return "climate-thunder";
    if (["mist", "fog", "haze", "smoke", "dust", "sand", "ash", "squall", "tornado"].includes(main)) return "climate-mist";
    if (main === "clouds") return "climate-clouds";
    return "climate-clear";
  };

  const isDay =
    weather &&
    Date.now() / 1000 > weather.sys.sunrise &&
    Date.now() / 1000 < weather.sys.sunset;

  return (
    <div className={`container ${isDay ? "day" : "night"} ${getWeatherClass()}`}>
      
      {/* SKY BACKGROUND */}
      {weather && <Sky condition={weather.weather[0].main} isDay={isDay} />}

      {/* WEATHER PARTICLES - only after data loads */}
      {weather && (
        <WeatherParticles
          type={
            weather.weather[0].main === "Snow"
              ? "snow"
              : ["Rain", "Drizzle", "Thunderstorm"].includes(weather.weather[0].main)
              ? "rain"
              : ["Mist", "Fog", "Haze", "Smoke", "Dust"].includes(weather.weather[0].main)
              ? "mist"
              : ""
          }
        />
      )}

      {/* LIGHTNING ANIMATION FOR THUNDERSTORMS */}
      {weather && <Lightning condition={weather.weather[0].main} />}

      {/* HEADER WITH PROPER FLEX CONTAINER */}
      <div className="top-bar">
        <Logo />
        
        <div className="controls-card">
          <div className="controls-group">
            <div className="select-container">
              <label htmlFor="city-select" className="visually-hidden">Choose a City</label>
              <select
                id="city-select"
                value={CITIES.includes(city) ? city : ""}
                onChange={(e) => {
                  const selected = e.target.value;
                  if (selected) {
                    setCity(selected);
                    setSearchInput(selected);
                  }
                }}
                className="city-select"
              >
                <option value="" disabled>-- Select a City --</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="search-box">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setCity(searchInput);
                  }
                }}
                placeholder="Search city..."
              />
              <button onClick={() => setCity(searchInput)}>Search</button>
              <button
                onClick={handleUseMyLocation}
                disabled={locating}
                title="Use my current location"
                className="location-btn"
              >
                {locating ? "Locating..." : "My Location"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message glass">{error}</div>}

      {weather && !loading && (
        <div className="dashboard-grid">
          {/* MAIN WEATHER */}
          <div className="glass main-card">
            <h1>{weather.name}</h1>

            <h2>{Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}</h2>

            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />

            <p className="condition-desc">{weather.weather[0].description}</p>

            <div className="details">
              <span>Humidity: {weather.main.humidity}%</span>
              <span>Wind: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</span>
            </div>

            {/* LOCAL TIME */}
            <div className="local-time">
              {new Date().toLocaleString("en-US", {
                timeStyle: "short",
                dateStyle: "medium"
              })}
            </div>
          </div>

          {/* AI SUMMARY */}
          <WeatherSummary weather={weather} />

          {/* AIR QUALITY & UV */}
          <AirQuality data={air} />

          {/* UV INDEX */}
          <UVIndex value={uv?.value} />

          {/* SUNRISE / SUNSET */}
          <SunCycle
            sunrise={weather.sys.sunrise}
            sunset={weather.sys.sunset}
          />

          {/* MOON PHASE */}
          <MoonPhase />

          {/* CLIMATE VIBE ANIMATION */}
          <ClimateVibe condition={weather.weather[0].main} isDay={isDay} />

          {/* HOURLY FORECAST */}
          {forecast && <HourlyForecast data={forecast} />}

          {/* MAP */}
          <WeatherMap
            lat={weather.coord.lat}
            lon={weather.coord.lon}
            city={weather.name}
            onLocationChange={handleMapLocationChange}
          />
        </div>
      )}
    </div>
  );
}
