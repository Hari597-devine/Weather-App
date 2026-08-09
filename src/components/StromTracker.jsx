export default function StormTracker({ weather }) {
  if (!weather) return null;

  const condition = weather.weather[0].main;

  let alert = "No severe weather";

  if (condition === "Thunderstorm") {
    alert = "Thunderstorm detected in your area";
  } else if (condition === "Rain") {
    alert = "Heavy rain possible";
  } else if (condition === "Snow") {
    alert = "Snowfall conditions active";
  }

  return (
    <div className="glass storm">
      <h3>Storm Tracking</h3>
      <p>{alert}</p>
    </div>
  );
}