export default function AirQuality({ data }) {
  if (!data) return null;

  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components || {};

  const getAQIText = () => {
    switch (aqi) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "";
    }
  };

  const getAQIClass = () => {
    switch (aqi) {
      case 1: return "aqi-good";
      case 2: return "aqi-fair";
      case 3: return "aqi-moderate";
      case 4: return "aqi-poor";
      case 5: return "aqi-very-poor";
      default: return "";
    }
  };

  const pollutants = [
    { label: "PM2.5", value: components.pm2_5, unit: "µg/m³" },
    { label: "PM10", value: components.pm10, unit: "µg/m³" },
    { label: "O₃", value: components.o3, unit: "µg/m³" },
    { label: "CO", value: components.co, unit: "µg/m³" },
    { label: "NO₂", value: components.no2, unit: "µg/m³" },
    { label: "SO₂", value: components.so2, unit: "µg/m³" },
  ].filter((p) => p.value != null);

  return (
    <div className="glass air-box">
      <div className="air-box-header">
        <div>
          <h3>Air Quality</h3>
          <p className={`aqi-badge ${getAQIClass()}`}>{getAQIText()}</p>
        </div>
      </div>

      <div className="pollutant-grid">
        {pollutants.map((p) => (
          <div key={p.label} className="pollutant-item">
            <span className="pollutant-label">{p.label}</span>
            <span className="pollutant-value">{Math.round(p.value * 10) / 10}</span>
            <span className="pollutant-unit">{p.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
