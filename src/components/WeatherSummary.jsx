export default function WeatherSummary({ weather }) {
  if (!weather) return null;

  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const desc = weather.weather[0].description;

  let message = "";

  if (temp > 35) {
    message = "Extreme heat conditions. Avoid outdoor activity.";
  } else if (temp > 25) {
    message = "Warm weather. Stay hydrated.";
  } else if (temp < 10) {
    message = "Cold conditions. Wear warm clothing.";
  } else {
    message = "Comfortable weather conditions.";
  }

  if (humidity > 80) {
    message += " High humidity may cause discomfort.";
  }

  if (wind > 10) {
    message += " Strong winds expected.";
  }

  return (
    <div className="glass summary">
      <h3>Weather Insight</h3>
      <p>{desc}</p>
      <p>{message}</p>
    </div>
  );
}