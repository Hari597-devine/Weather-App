import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.error(
    "Missing VITE_API_KEY. Create a .env file in the project root with VITE_API_KEY=your_openweathermap_key"
  );
}

export const getWeather = async (city, unit = "metric") => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const getForecast = async (city, unit = "metric") => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching forecast weather:", error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat, lon, unit = "metric") => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching current weather by coords:", error);
    throw error;
  }
};

export const getForecastByCoords = async (lat, lon, unit = "metric") => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching forecast by coords:", error);
    throw error;
  }
};

export const getAirQuality = async (lat, lon) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching air quality:", error);
    throw error;
  }
};
